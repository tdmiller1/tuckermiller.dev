# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tuckermiller.dev` is a personal portfolio/resume site: a Create React App SPA (react-scripts 5 / webpack 5) deployed to Firebase Hosting (project `tuckermillerdev-8c74f`). All content is hardcoded in JSX — there is no CMS, API, or data layer.

Stack: React 18, MUI v5 (`@mui/material` + emotion), React Router v6 (hash routing), PrimeReact 10 + chart.js 4 for the one chart on the GitHub page.

`TODO.md` tracks an in-progress overhaul of the site's content and tabs; `design/` holds static HTML/CSS mockups for it. Both are working documents, not build inputs.

## Commands

```bash
npm install          # node_modules is not checked in
npm start            # dev server on :3000
npm run build        # production build into build/
npm test             # react-scripts test --env=jsdom
```

Requires Node >= 18 (enforced via `engines`). CI uses Node 24.

`package-lock.json` is npm-11 shaped. Regenerating it under npm 10 adds an entry
(`tailwindcss/node_modules/yaml`) that npm 11 strips again on the next `npm install`,
and `npm ci` on npm 10 fails without it. Keep CI on a Node that ships npm 11.

**There are no tests.** No `*.test.*` / `*.spec.*` / `__tests__` exist. `npm test` starts CRA's Jest watcher and finds nothing; under `CI=true` it exits non-zero, which is why no CI job runs it. Adding a test file is enough for CRA to pick it up — no config needed.

**Lint runs as part of the build**, not as a separate script. `eslintConfig: { extends: ["react-app"] }` in `package.json` drives it, and CRA 5 surfaces ESLint errors through webpack. Because CI sets `CI=true`, **warnings become build failures in CI but not locally** — a local `npm run build` can pass where CI fails. Reproduce CI with `CI=true npm run build`.

## Architecture

Render chain:

`src/index.js` (createRoot) → `src/App.jsx` (HashRouter + CssBaseline) → `src/AppNavigation.jsx` (chrome) → `src/AppRouter.jsx` (route table) → page components

- **`src/routes.jsx` is the single source of truth** for navigation and routing. Each entry is `{ label, path, icon, element, group }`. `AppNavigation` renders the drawer from `PRIMARY_NAV`/`SECONDARY_NAV`; `AppRouter` renders one `<Route>` per entry. **Add, remove, or rename a tab here and nowhere else.**
- **`App.jsx` owns the `<HashRouter>`**, deliberately. `AppNavigation` renders `<Link>`s, so it must sit inside router context — that's why the Router is above it rather than in `AppRouter`.
- **`AppNavigation.jsx`** owns all chrome: `AppBar`, the responsive `Drawer` (permanent at `sm+`, temporary below), and the nav lists. It renders `<AppRouter />` inside its `<main>`.
- **`AppRouter.jsx`** is the route table only. `/` renders the work timeline (not `Home`). `LEGACY_REDIRECTS` keeps the old `#/work experience` URL alive; `*` redirects to `/`.

Routing is hash-based (`/#/projects`). The `rewrites: ** → /index.html` in `firebase.json` is a fallback and isn't what drives navigation.

### History worth knowing

Navigation used to do `window.location = "#/" + label`, making each nav label its own URL — which is why the route was literally `/work experience`, with a space, and why a `renderIcon` switch had to be kept in sync with the label array. That coupling is gone; paths are explicit and space-free. Keep them that way.

### Styling: three coexisting approaches

No single convention. Match whatever the file already does:

- MUI `sx` props — `App.jsx`, `AppNavigation.jsx` (the migrated files),
- module-scope inline style objects (`const chip = { margin: "5px" }`) — the page components,
- plain CSS — global `src/styles.css`, plus `src/assets/education.css` and `src/assets/work-styles.css`.

Page components are still ES6 class components; the shell (`App`, `AppNavigation`, `AppRouter`) is function components with hooks.

## Known landmines

- `public/index.html` hardcodes a Firebase web config and a Google Analytics tag.
- The resume PDF is generated from `resume/resume.html` into `public/resume-tucker-miller.pdf` and served from there — see `resume/README.md`. It is the only copy on purpose; a second one in `resume/` went stale and shipped a two-page build. (It used to be hotlinked from an S3 bucket; that link is gone.)
- `Work.jsx` pulls the Lessonly logo from a **third-party hotlink** (`betterbuys.com`); it will silently 404 someday.
- `build/` is gitignored and no longer tracked. It used to have stale artifacts committed; don't re-add them.
- MUI v5 has no `Hidden` component in the codebase anymore — responsive show/hide is done with `sx={{ display: { xs: ..., sm: ... } }}`. Don't reintroduce `Hidden` (deprecated in v5, gone in v6).

## Deploying / updating the live site

**The live site updates by pushing to `master`.** There is no deploy script to run locally.

`.github/workflows/nodejs.yml` fires on push to `master`: `npm ci` → `npm run build` (with `CI=true`) → `npx firebase-tools deploy --only hosting`, authenticating with the `FIREBASE_SERVICE_ACCOUNT` repo secret (a service account JSON key, written to a temp file that `GOOGLE_APPLICATION_CREDENTIALS` points at).

Auth used to be the `FIREBASE_TOKEN` secret from `firebase login:ci`. That is deprecated and the token stopped authenticating. Two traps if you touch this:

- **`FIREBASE_TOKEN` in the environment shadows the service account** — `requireAuth` checks it before falling back to Application Default Credentials. Don't set both.
- **An auth failure does not look like an auth failure.** `deploy --only hosting` calls `requireHostingSite()`, whose catch block re-throws only on 403 or "no default site" and *swallows 401s*. The deploy then dies much later with `Assertion failed: resolving hosting target of a site with no site name or target name`. If you ever see that assertion, it means authentication failed — re-run with `--debug` to see the real 401.

Deploying by hand is possible but differs from CI in a way that matters: **`firebase deploy` does not build.** Per `firebase.json` it uploads whatever is currently in `build/`. Always `npm run build` immediately before any manual deploy, and note `firebase-tools` is not a dependency — use `npx firebase-tools` or a global install plus `firebase login`.

The deploy step used to live inside a `node-version: [10.x, 12.x]` matrix, so every push to `master` ran two concurrent `firebase deploy` calls racing to publish the same commit. It is now a single un-matrixed job. Keep it that way.

## Branching

Git-flow (`master` ← `release/*` ← `develop`), which explains the merge-commit history. `develop` is the integration branch; `master` is production and auto-deploys.

`.github/workflows/nodejsdev.yml` runs on push to `develop` and now does `npm ci` + `npm run build`. It previously ran checkout + setup-node only, so a broken `develop` stayed invisible until it reached `master` — where it would deploy.
