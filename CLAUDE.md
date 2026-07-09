# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`tuckermiller.dev` is a personal portfolio/resume site: a Create React App (react-scripts 3.x) SPA deployed to Firebase Hosting (project `tuckermillerdev-8c74f`). All content is hardcoded in JSX — there is no CMS, API, or data layer.

## Commands

```bash
npm install          # node_modules is not checked in
npm start            # dev server on :3000
npm run build        # production build into build/
npm test             # react-scripts test --env=jsdom
```

These four are the entire `scripts` block. There is **no `deploy` script** and `firebase-tools` is **not a dependency** — see Deploying below.

Notes on the toolchain, so you don't chase phantoms:

- **There are no tests.** No `*.test.*`, `*.spec.*`, or `__tests__` exist anywhere. `npm test` starts CRA's Jest watcher and finds nothing. If you add a test, CRA picks it up automatically — no config needed.
- **Lint is not runnable as configured.** `.eslintrc.json` extends `google` + `prettier` and uses `plugin:react`, but none of `eslint`, `prettier`, `eslint-config-google`, `eslint-config-prettier`, `eslint-plugin-react`, or `eslint-plugin-prettier` are in `package.json`, and there is no `lint` script. Installing those devDeps is a prerequisite for any `npx eslint` run. (CRA's built-in `eslint-config-react-app` still runs during `npm start`/`npm run build` and is unrelated to this file.)

## Architecture

The render chain is four files deep and worth knowing before touching anything:

`src/index.js` → `src/App.jsx` → `src/AppNavigation.jsx` → `src/AppRouter.jsx` → page components

- **`AppNavigation.jsx`** owns *all* chrome: the Material-UI `AppBar`, the responsive `Drawer` (permanent on `sm+`, temporary on mobile), and the nav list. It renders `<AppRouter />` inside its `<main>`. It is the only stateful shell component.
- **`AppRouter.jsx`** is a `HashRouter` (URLs look like `/#/projects`). Firebase's `rewrites: ** → /index.html` in `firebase.json` is a belt-and-braces fallback; hash routing is what actually drives navigation.

### Nav ↔ route coupling (the main footgun)

Navigation does **not** use `<Link>`. `AppNavigation.handleClick` does `window.location = "#/" + text.text`, where `text` is the literal nav label string. So a nav label is implicitly a route path. Adding or renaming a nav item means editing **three** places in lockstep:

1. one of the two label arrays in `AppNavigation.render` (main list / secondary list),
2. the `renderIcon` switch (unmatched labels silently fall through to `<Home />`),
3. a `<Route>` in `AppRouter.jsx`.

This works today only because react-router matches case-insensitively by default: the label `"Work Experience"` navigates to `#/Work Experience` and matches the route `path="/work experience"`. Same for `"POC"` → `path="/poc"`. Preserve that or the link breaks silently.

The catch-all `<Route path="/" exact>` renders `WorkComponent`, so the work timeline — not `Home` — is the landing page.

### Styling: four coexisting approaches

There is no single convention. Expect to find, and match locally:

- module-scope inline style objects (`const chip = { margin: "5px" }`) — the dominant pattern in page components,
- Material-UI `withStyles` + `theme.breakpoints` — only in `AppNavigation.jsx`,
- `styled-components` — exported from `src/containers.jsx` (largely unused by current pages),
- plain CSS — global `src/styles.css`, plus per-page `src/assets/education.css` and `src/assets/work-styles.css`.

Page components are ES6 class components, except `src/assets/components/Proof/` which uses hooks. Note that directory: React components live under `src/assets/`, not beside the other pages.

## Known landmines

These are pre-existing and confirmed; don't "fix" them incidentally without saying so, and don't be confused by them:

- **`src/Work.js` is dead code.** It's a stale duplicate of `src/Work.jsx` (it still says "Associate Software Engineer I" where the live file says "Senior Software Engineer"). `AppRouter.jsx` imports `"./Work.jsx"` with the explicit extension, which is the only thing disambiguating the two. **Edit `Work.jsx`.** Editing `Work.js` changes nothing that renders.
- **`react@^17` is paired with `react-dom@^16.8.4`.** `react-dom` is also declared in *both* `dependencies` and `devDependencies`, at the same version. The app runs on the resolved v16 DOM renderer against a v17 `react` — treat the pair as needing to move together.
- **`prop-types` is imported by `AppNavigation.jsx` but is not declared** in `package.json`. It resolves transitively today.
- **`build/` is gitignored but four files under it are still tracked** (`index.html`, `service-worker.js`, `asset-manifest.json`, one media asset) from before the ignore rule. They are stale and are not what Firebase serves — CI rebuilds `build/` before deploying.
- The resume link in `AppNavigation.jsx` is a hardcoded S3 URL, and `public/index.html` hardcodes a Firebase web config and a Google Analytics tag.

## Deploying / updating the live site

**The live site updates by pushing to `master`.** That is the intended path; there is no deploy script to run locally.

`.github/workflows/nodejs.yml` fires on push to `master` and runs, in one step:

```bash
npm i -g firebase-tools
npm ci
npm run build --if-present
firebase deploy --token ${{ secrets.FIREBASE_TOKEN }}
```

Deploying by hand is possible but is **not** what CI does, and the difference matters:

- `firebase-tools` is not in `package.json` — you need it installed globally, plus `firebase login` (CI substitutes the `FIREBASE_TOKEN` repo secret).
- **`firebase deploy` does not build.** Per `firebase.json` it uploads whatever is currently in `build/`. Because four stale `build/` files are tracked in git (see Known landmines), a `firebase deploy` in a fresh clone would publish *2019-era artifacts*. Always `npm run build` immediately before any manual deploy.

Two rough edges in the workflow itself, worth knowing before editing it:

- The deploy step lives **inside the `node-version: [10.x, 12.x]` matrix**, so every push to `master` runs two jobs that both call `firebase deploy` — two concurrent deploys of the same commit, racing. Whichever finishes last wins. Moving the deploy into its own non-matrixed job (`needs: build`) would fix it.
- The step is named "npm install, build, and test" but **never runs tests** — there are none to run.

## Branching

Git-flow (`master` ← `release/*` ← `develop`), which explains the merge-commit history. `develop` is the integration branch; `master` is production and auto-deploys.

`.github/workflows/nodejsdev.yml` runs on push to **`develop`** and does checkout + setup-node only — no build, no test. It cannot catch a broken `develop`, so breakage surfaces only once it reaches `master`, where it deploys.

## Node version

Both workflows matrix over Node 10.x and 12.x, long EOL. The local machine runs Node 24, and `react-scripts` 3.x is webpack 4, which typically dies on Node 17+ with `ERR_OSSL_EVP_UNSUPPORTED`. If `npm start`/`npm run build` fails that way, the usual workaround is `NODE_OPTIONS=--openssl-legacy-provider npm start`. Unverified here — `node_modules` was not installed when this file was written.
