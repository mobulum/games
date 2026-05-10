# Mobulum Games

Monorepo for browser games hosted at `games.mobulum.com`.  
Each game is deployed to its own repo in [github.com/mobulum-games](https://github.com/mobulum-games) with a custom subdomain.

## Stack

- **Phaser 3** - game framework
- **Vite** - build tool
- **TypeScript** - language
- **GitHub Pages** - hosting

## Structure

```
games/
├── index.html              # Root page (games.mobulum.com)
├── CNAME
├── projects/
│   ├── base/               # Template for new games
│   ├── defend-yourself/    # Example game project
│   └── .../
├── scripts/
│   └── create-project.sh   # CLI to scaffold new games
└── .github/workflows/
    ├── deploy-root.yml     # Deploys root page
    └── deploy-game.yml     # Deploys game dist to target repo
```

## Create a new game

```bash
./scripts/create-project.sh <project-slug>
```

Example:
```bash
./scripts/create-project.sh defend-yourself
```

This will:
1. Copy `projects/base` to `projects/defend-yourself`
2. Update package name, title, and display text
3. Install deps and build
4. Add the game to the root page games list
5. Create repo `mobulum-games/defend-yourself` on GitHub
6. Push dist files with CNAME `defend-yourself.games.mobulum.com`

## Development

```bash
cd projects/<slug>
npm run dev     # Start dev server on :3000
npm run build   # Production build to dist/
```

## Deploy

- **Root page**: auto-deploys on push to `main` when `index.html` changes
- **Games**: auto-deploys on push to `main` when files in `projects/<slug>/` change
- **Manual deploy**: trigger `Deploy Game` workflow with project slug

### Required setup

1. Create a GitHub PAT with `repo` scope and add it as `DEPLOY_TOKEN` secret in this repo
2. Enable GitHub Pages on each target repo (Settings > Pages > main branch)
3. DNS: `CNAME *.games.mobulum.com -> mobulum-games.github.io`
