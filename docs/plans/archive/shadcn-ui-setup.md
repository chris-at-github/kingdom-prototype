# shadcn/ui setup

## Context & Goal

Add shadcn/ui to the React application so UI components can be pulled into the
project as source code. shadcn/ui is not a dependency-style component library:
the CLI copies component source into the repository, where it is owned and
edited like any other project file.

The setup requires Tailwind CSS 4, a `@/` path alias and a `components.json`
describing the project layout. The theme itself is provided by the user as a set
of CSS variables and is not part of this change.

## Non-Goals

- No custom theme values. The generated default variables stay in `index.css`
  and are replaced by the user afterwards.
- No dark mode. The theme is light only, no `.dark` block and no theme switcher.
- No component library beyond a single Button used as a smoke test.
- No routing, forms or state management.
- No linting, formatting or test setup.

## Acceptance Criteria

1. `ddev exec npm run build` completes, including the TypeScript build.
2. The dev server renders a page containing a styled shadcn Button.
3. `frontend/components.json` exists with CSS variables enabled.
4. Imports of the form `@/components/ui/button` resolve for both TypeScript and Vite.
5. `index.css` contains the shadcn variable block in one place, ready to be
   swapped for the user's own theme.
6. No leftover styles from the Vite template (`App.css`) remain in the project.
7. The existing DDEV dev server configuration keeps working unchanged.

## Open Decisions

- **Tailwind CSS 4 via `@tailwindcss/vite`** instead of the PostCSS plugin: it is
  the documented path for Vite projects and needs no PostCSS configuration.
- **Alias `@/` in two places**: TypeScript resolves types through `tsconfig`,
  while Vite resolves the actual import at build time through `resolve.alias`.
  Both must agree or the build and the editor disagree.
- **CSS variables enabled** in `components.json`, because the user's theme is
  variable based.
- **Base color `neutral`** is only a placeholder for the generated variables.

## Checklist

- [x] Install `tailwindcss` and `@tailwindcss/vite` in the container
- [x] Replace `frontend/src/index.css` with the Tailwind import
- [x] Add the `@/*` path alias to `tsconfig.json` and `tsconfig.app.json`
- [x] Add the Tailwind plugin and the alias to `frontend/vite.config.ts`
- [x] Run `shadcn init` with CSS variables and base color neutral
- [x] Add the Button component
- [x] Replace `App.tsx` with a minimal view using the Button, remove `App.css`
- [x] Verify dev server output and production build
- [x] Add a shadcn/ui recipe to `docs/guides/` and list it in the guides index
- [x] Update the stack section in `CLAUDE.md`
