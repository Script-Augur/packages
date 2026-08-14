# @script-augur/packages

Immutable infrastructure packages for the Script-Augur coding system. Published to **GitHub Packages** under the `@script-augur` scope.

## Packages

| Package | Purpose |
|---------|---------|
| `@script-augur/vite-plugin-image-gen` | Build-time image presets |
| `@script-augur/vite-plugin-svg-sprite` | SVG sprite + DTS generation |
| `@script-augur/eslint-plugin-module-ordering` | File section reorder (ESLint autofix) |
| `@script-augur/eslint-config` | Flat ESLint config (owns import sorting) |
| `@script-augur/prettier-config` | Prettier + Tailwind class sort only |
| `@script-augur/tsconfig` | Shared TypeScript bases |

## Boundary

If it imports Node built-ins, hooks into Vite, or is non-UI infrastructure → it belongs here (versioned npm), **not** the shadcn UI registry.

## Local auth (once per machine)

Create a GitHub PAT with `read:packages` (and `write:packages` if you publish).

**Option A — user `~/.npmrc`:**

```ini
@script-augur:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN
```

**Option B — env var** (repo `.npmrc` already uses `${NPM_TOKEN}`):

```bash
export NPM_TOKEN=ghp_YOUR_TOKEN
```

You do **not** need a token per repo locally.

## CI auth

Use the composite action from this repo:

```yaml
- uses: Script-Augur/packages/.github/actions/setup-script-augur@main
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }} # or GITHUB_TOKEN with packages:read
- run: pnpm install
```

## Develop

```bash
pnpm install
pnpm build
pnpm test
pnpm changeset   # after meaningful package changes
```

## Publish

Merges to `main` with pending changesets open a Version PR / publish via Changesets + GitHub Packages (`NODE_AUTH_TOKEN` = `GITHUB_TOKEN`).
