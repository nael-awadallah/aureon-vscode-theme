# Publishing Aureon

Aureon is published as `nael-awadallah.aureon-theme` on the
[VS Code Marketplace](https://marketplace.visualstudio.com/publishers/nael-awadallah)
and on [Open VSX](https://open-vsx.org) (used by Cursor, Windsurf, VSCodium and others).

## One-time setup

1. **GitHub repository.** Push to `github.com/nael-awadallah/aureon-vscode-theme` and make it public. The README images load from `raw.githubusercontent.com/.../main/images/`, so they only show on the Marketplace once `main` is public.
2. **Marketplace token (`VSCE_PAT`).**
   - Sign in to [dev.azure.com](https://dev.azure.com) with the account that owns the `nael-awadallah` publisher.
   - User settings → Personal access tokens → New token. Organization: **All accessible organizations**. Scopes: **Marketplace → Manage**.
   - Check it locally: `npx vsce login nael-awadallah`.
3. **Open VSX token (`OVSX_PAT`).**
   - Sign in to [open-vsx.org](https://open-vsx.org) with GitHub and sign the publisher agreement.
   - Settings → Access Tokens → generate one.
   - Create the namespace once: `npx ovsx create-namespace nael-awadallah -p <token>`.
4. **Repository secrets.** GitHub → Settings → Secrets and variables → Actions → add `VSCE_PAT` and `OVSX_PAT`.

## Releasing a version

1. Update `CHANGELOG.md` and bump `version` in `package.json`.
2. If colors changed, refresh the images: `npm run screenshots && npm run hero`.
3. Run every check locally:
   ```
   npm run build && npm run check && npm test && npm run test:vscode
   ```
4. Commit, then tag and push:
   ```
   git tag v0.1.0
   git push origin main --tags
   ```
5. The **Release** workflow tests everything again, publishes to both registries, and attaches the `.vsix` to a GitHub release.

## Publishing by hand

```
npx vsce package
npx vsce publish --packagePath aureon-theme-0.1.0.vsix
npx ovsx publish aureon-theme-0.1.0.vsix -p <OVSX token>
```

## Before the first release, check

- [ ] The name **Aureon Theme** isn't already taken on the Marketplace or Open VSX
- [ ] The repository is public and the README images load
- [ ] `npx vsce ls` lists only the themes, icon, README, CHANGELOG, LICENSE and package.json
- [ ] Each of the 6 themes looks right after installing the `.vsix` (`Extensions: Install from VSIX…`)
