from dataclasses import dataclass, field
import re

HEX = re.compile(r"^#[0-9a-f]{6}$", re.IGNORECASE)


@dataclass
class Palette:
    """A named set of colors."""

    name: str
    colors: dict[str, str] = field(default_factory=dict)

    def add(self, role: str, value: str) -> None:
        if not HEX.match(value):
            raise ValueError(f"Bad color for {role}: {value!r}")
        self.colors[role] = value.upper()

    @property
    def size(self) -> int:
        return len(self.colors)


def build(name: str) -> Palette:
    palette = Palette(name)
    palette.add("gold", "#e5b567")
    return palette


if __name__ == "__main__":
    aureon = build("Aureon Dark")
    print(aureon.size, True, None)
