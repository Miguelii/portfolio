# Vendored anti-slop Oxlint plugin

## Source

- **Source:** the `install-anti-slop` agent skill, `assets/anti-slop/`, installed locally at `~/.claude/skills/install-anti-slop` (skill files dated 2026-10-26).
- **Upstream repository and commit:** unknown. The local skill copy is not a git checkout and carries no repository URL or revision, so the original source commit could not be established.
- **Pristine snapshot:** the copied files were byte-identical to the skill assets at install time (2026-10-27). Their SHA-256 tree hash is `24f771967ed0c6595fcac4adb93086b4996ccb06a570146f059e720bbf807acf`, computed from inside this directory with this file excluded:

  ```bash
  find . -type f ! -path ./UPSTREAM.md | LC_ALL=C sort | xargs shasum -a 256 | shasum -a 256
  ```

  Use it to confirm whether local files still match the pristine snapshot before merging upstream changes.

## Installed paths

- `tools/oxlint/anti-slop/index.ts`: generic plugin (`anti-slop`)
- `tools/oxlint/anti-slop/effect/index.ts`: Effect plugin (`anti-slop-effect`), enabled because `effect` is a direct dependency
- `tools/oxlint/anti-slop/vendor/eslint-stylistic/`: vendored ESLint Stylistic rule with its `LICENSE` and its own `UPSTREAM.md`

## Integration

- `@oxlint/plugins` is pinned to `1.56.0`, which matches the `oxlint` that `vite-plus` bundles. Upgrade both together.
- Both plugins are registered in `vite.config.ts` under `lint`. Every rule is set to `"error"`, along with the native `oxc/no-accumulating-spread`, except `anti-slop/no-module-mocking` and `anti-slop/require-readable-spacing`, which this project turns `"off"`. Agent tooling directories and this directory are listed in both `lint.ignorePatterns` and `fmt.ignorePatterns`.

## Intentional deviations

- The plugin source has not been modified.
- `tsconfig.json` excludes this directory. The source uses `.ts` import extensions, which the app's compiler options reject. When checked against the `@oxlint/plugins@1.56.0` types, it also reports two narrowing errors: `rules/no-widen-then-assert.ts:285` and `shared/function-parameters.ts:45` both narrow to `never`. Oxlint loads the plugin at runtime, and neither error affects linting.
- `knip.json` lists both plugin entry points so that `@oxlint/plugins` is detected as used. It also ignores issues in this directory, which leaves the vendored exports untouched.
