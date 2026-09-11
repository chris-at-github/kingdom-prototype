# React + Vite environment in DDEV

## Context & Goal

Set up the development environment for a React application built with Vite,
running entirely inside DDEV. Until now the repository contains documentation
only, so this change introduces the first application code and the container
setup around it.

The environment must provide a reproducible Node.js runtime in a container, a
Vite dev server reachable from the host browser over the DDEV router, and
working hot module replacement (HMR).

## Non-Goals

- No backend, API or database. The `db` container stays disabled.
- No linting or formatting workflow. The ESLint configuration shipped by the
  Vite template is kept as delivered, but not configured, extended or documented.
- No test setup. Tests are introduced later in the project.
- No routing, state management, styling framework or component library.
- No production deployment, CI or hosting configuration.

## Acceptance Criteria

1. `ddev start` starts the project without errors and without a database container.
2. `ddev npm install` installs the dependencies inside the container.
3. `ddev npm run dev` serves the React start page at
   `https://kingdom-prototype.ddev.site:5173` in the host browser.
4. Editing `frontend/src/App.tsx` updates the browser without a full page
   reload (HMR works through the DDEV router).
5. `ddev npm run build` produces a production build in `frontend/dist/`.
6. `node_modules/`, `dist/` and DDEV's generated files are not tracked by git.
7. Node.js is only ever invoked inside the container; no host Node.js is required.

## Open Decisions

- **Project type `generic` with webserver type `generic`**: the project needs a
  Node.js runtime, not PHP. `generic` avoids starting nginx-fpm and PHP-FPM.
- **Application in `frontend/`**: keeps room for a backend directory next to it
  without restructuring. `working_dir` points the web container at that folder so
  `ddev npm ...` runs in the right place.
- **Port 5173 exposed through the DDEV router** via `web_extra_exposed_ports`
  instead of publishing a raw Docker port. This yields a trusted HTTPS URL, which
  in turn allows HMR over `wss` without browser warnings.
- **Vite listens on `0.0.0.0`** inside the container; the default `localhost`
  binding would not be reachable from outside the container.
- **Node.js 24** matches DDEV's current default and the host toolchain.
- **TypeScript** via the `react-ts` template.

## Checklist

- [x] Create DDEV configuration (`ddev config`) with type `generic`, webserver
      `generic`, Node.js 24 and the `db` container omitted
- [x] Extend `.ddev/config.yaml` with `working_dir` and the exposed Vite port
- [x] Start the project and verify the container is running
- [x] Scaffold the Vite `react-ts` template into `frontend/` from inside the container
- [x] Configure `frontend/vite.config.ts` for host binding, port and HMR
- [x] Extend `.gitignore` for `node_modules/`, `dist/` and DDEV artifacts
- [x] Install dependencies and verify the dev server in the browser (HMR included)
- [x] Verify the production build
- [x] Add a DDEV/Vite recipe to `docs/guides/` and list it in the guides index
- [x] Fill the stack, commands and structure sections in `CLAUDE.md`
