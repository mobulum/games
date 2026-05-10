#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECTS_DIR="$ROOT_DIR/projects"
BASE_DIR="$PROJECTS_DIR/base"
ORG="mobulum-games"
DOMAIN="games.mobulum.com"

usage() {
  echo "Usage: $0 <project-slug>"
  echo ""
  echo "Creates a new game project from the base template."
  echo "The slug must be lowercase, using hyphens (e.g. defend-yourself)."
  echo ""
  echo "Example: $0 defend-yourself"
  exit 1
}

if [[ $# -lt 1 ]]; then
  usage
fi

SLUG="$1"

# Validate slug
if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "Error: slug must be lowercase alphanumeric with hyphens, e.g. 'defend-yourself'"
  exit 1
fi

PROJECT_DIR="$PROJECTS_DIR/$SLUG"
SUBDOMAIN="$SLUG.$DOMAIN"

if [[ -d "$PROJECT_DIR" ]]; then
  echo "Error: project '$SLUG' already exists at $PROJECT_DIR"
  exit 1
fi

echo "==> Creating project '$SLUG' from base template..."
cp -r "$BASE_DIR" "$PROJECT_DIR"

# Remove node_modules and dist if copied
rm -rf "$PROJECT_DIR/node_modules" "$PROJECT_DIR/dist"

# Update package.json name
sed -i '' "s/\"name\": \"base\"/\"name\": \"$SLUG\"/" "$PROJECT_DIR/package.json"

# Update HTML title
DISPLAY_NAME=$(echo "$SLUG" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
sed -i '' "s/<title>Game<\/title>/<title>$DISPLAY_NAME<\/title>/" "$PROJECT_DIR/index.html"

# Update GameScene text
sed -i '' "s/Base Template/$DISPLAY_NAME/" "$PROJECT_DIR/src/scenes/GameScene.ts"

# Add CNAME for GitHub Pages
echo "$SUBDOMAIN" > "$PROJECT_DIR/CNAME"

# Install dependencies
echo "==> Installing dependencies..."
(cd "$PROJECT_DIR" && npm install)

# Build
echo "==> Building..."
(cd "$PROJECT_DIR" && npm run build)

# Update root index.html with new game entry
echo "==> Updating root games list..."
ENTRY="        { name: \"$DISPLAY_NAME\", url: \"https://$SUBDOMAIN\" },"
sed -i '' "/\/\/ GAMES_LIST_END/i\\
$ENTRY
" "$ROOT_DIR/index.html"

# Create GitHub repo and push dist
echo "==> Creating GitHub repo '$ORG/$SLUG'..."
if gh repo view "$ORG/$SLUG" &>/dev/null; then
  echo "    Repo already exists, skipping creation."
else
  gh repo create "$ORG/$SLUG" --public --description "$DISPLAY_NAME - browser game" || {
    echo "Warning: Could not create repo. Create it manually: https://github.com/organizations/$ORG/repositories/new"
  }
fi

echo "==> Pushing dist to $ORG/$SLUG..."
DIST_DIR="$PROJECT_DIR/dist"
TEMP_DIR=$(mktemp -d)
cp -r "$DIST_DIR/"* "$TEMP_DIR/"
echo "$SUBDOMAIN" > "$TEMP_DIR/CNAME"

(
  cd "$TEMP_DIR"
  git init -b master
  git add -A
  git commit -m "Initial deploy: $DISPLAY_NAME"
  git remote add origin "https://github.com/$ORG/$SLUG.git"
  git push -u origin master --force
)
rm -rf "$TEMP_DIR"

echo ""
echo "==> Done! Project '$SLUG' created."
echo "    Local:  $PROJECT_DIR"
echo "    Repo:   https://github.com/$ORG/$SLUG"
echo "    URL:    https://$SUBDOMAIN"
echo ""
echo "Next steps:"
echo "  1. Enable GitHub Pages on the repo (Settings > Pages > Source: master branch)"
echo "  2. Configure DNS: CNAME $SUBDOMAIN -> $ORG.github.io"
echo "  3. Start developing: cd $PROJECT_DIR && npm run dev"
