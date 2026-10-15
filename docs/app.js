// Live preview for the Aureon landing page. Data comes from window.AUREON (see build.ts).
(() => {
  const data = window.AUREON;
  const $ = (id) => document.getElementById(id);
  const editor = $("editor");
  const langs = { ts: "TypeScript", tsx: "TypeScript JSX", php: "PHP", py: "Python", css: "CSS" };

  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem("aureon-preview") || "{}");
    } catch {
      return {};
    }
  })();

  // Links can pick the preview: ?theme=dusk&vivid=1&italics=0
  const query = new URLSearchParams(location.search);
  const linked = query.get("theme") && `aureon-${query.get("theme").toLowerCase()}`;
  const known = (id) => data.variants.some((v) => v.id === id);

  const state = {
    variant: known(linked) ? linked : known(saved.variant) ? saved.variant : "aureon-dark",
    vivid: query.has("vivid") ? query.get("vivid") === "1" : saved.vivid === true,
    italics: query.has("italics") ? query.get("italics") !== "0" : saved.italics !== false,
    file: data.files[0].name,
  };

  const save = () => {
    try {
      localStorage.setItem("aureon-preview", JSON.stringify({ variant: state.variant, vivid: state.vivid, italics: state.italics }));
    } catch {
      // Storage can be blocked; the preview still works.
    }
  };

  // Theme switcher
  const options = $("variant-options");
  for (const v of data.variants) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="variant" value="${v.id}"><span>${v.label}</span>`;
    options.append(label);
  }
  options.addEventListener("change", (e) => {
    state.variant = e.target.value;
    render();
  });
  $("vivid").addEventListener("change", (e) => {
    state.vivid = e.target.checked;
    render();
  });
  $("italics").addEventListener("change", (e) => {
    state.italics = e.target.checked;
    render();
  });

  // Explorer and tabs
  const files = $("files");
  for (const f of data.files) {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" data-file="${f.name}"><span class="file-icon">${f.icon}</span>${f.name}</button>`;
    files.append(li);
  }
  const pick = (e) => {
    const button = e.target.closest("[data-file]");
    if (!button) return;
    state.file = button.dataset.file;
    render();
  };
  files.addEventListener("click", pick);
  $("tabs").addEventListener("click", pick);

  // Screenshots apply their theme to the page
  for (const shot of document.querySelectorAll(".shot")) {
    shot.addEventListener("click", () => {
      state.variant = shot.dataset.variant;
      render();
      editor.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    });
  }

  $("copy").addEventListener("click", async () => {
    const button = $("copy");
    try {
      await navigator.clipboard.writeText($("settings-code").textContent);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select and copy";
    }
    setTimeout(() => (button.textContent = "Copy"), 1800);
  });

  function render() {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(data.pages[state.variant])) root.style.setProperty(k, v);
    const chrome = data.chrome[state.vivid ? `${state.variant}-vivid` : state.variant];
    for (const [k, v] of Object.entries(chrome)) editor.style.setProperty(k, v);
    editor.classList.toggle("upright", !state.italics);
    document.querySelector('meta[name="theme-color"]').content = data.pages[state.variant]["--page"];

    for (const input of options.querySelectorAll("input")) input.checked = input.value === state.variant;
    $("vivid").checked = state.vivid;
    $("italics").checked = state.italics;

    // Tabs: semantic.ts stays open; the picked file opens next to it.
    const open = [...new Set([data.files[0].name, state.file])];
    $("tabs").innerHTML = open
      .map((name) => {
        const f = data.files.find((x) => x.name === name);
        return `<button type="button" role="tab" data-file="${name}" aria-selected="${name === state.file}"><span class="file-icon">${f.icon}</span>${name}</button>`;
      })
      .join("");
    for (const b of files.querySelectorAll("button")) b.setAttribute("aria-current", String(b.dataset.file === state.file));
    $("crumbs").textContent = `aureon › ${state.file}`;
    $("status-lang").textContent = langs[state.file.split(".").pop()];

    const lines = data.code[state.variant][state.file];
    $("code").innerHTML = lines
      .map((html, i) => `<div class="row${i === 0 ? " active" : ""}"><span class="n">${i + 1}</span><span class="t">${html}</span></div>`)
      .join("");

    const swatches = data.swatches[state.variant];
    for (const el of document.querySelectorAll(".role-swatch")) el.style.background = swatches[el.dataset.role];
    for (const el of document.querySelectorAll(".role-sample")) el.style.color = swatches[el.dataset.role];
    for (const el of document.querySelectorAll(".role-hex")) el.textContent = swatches[el.dataset.hex];
    for (const shot of document.querySelectorAll(".shot")) shot.setAttribute("aria-pressed", String(shot.dataset.variant === state.variant));

    save();
  }

  render();
})();
