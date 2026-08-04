# Shared Site Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Build one reusable top navigation used by all six SkyDAO pages.

**Architecture:** A shared React component owns global navigation data, rendering, language controls, mobile menu state, and theme classes. Page entry wrappers provide locale and navigation callbacks; About keeps a separate page-local chapter menu.

**Tech Stack:** React 19, Vite 8, CSS, Phosphor Icons

---

### Task 1: Create the shared navigation component

**Files:**
- Create: `pages/shared/SiteNavigation.jsx`
- Create: `pages/shared/site-navigation.css`

**Steps:**
1. Define the seven global destinations with English and Chinese labels.
2. Render the shared logo, desktop links, language switch, INDEX toggle, and mobile overlay.
3. Add `locale`, `onLocaleChange`, `onNavigate`, `theme`, and `currentPage` props.
4. Add body menu-lock cleanup and accessible expanded/hidden states.
5. Add responsive layout and dark/light theme classes.
6. Add direction-aware visibility: hide after 12px downward movement, reveal on upward movement, and remain visible near the top or while INDEX is open.
7. Add a theme-aware translucent 18px backdrop blur whenever the visible navigation is away from the page top, with a smooth transition to transparency at the top.

### Task 2: Migrate the four existing Navigation consumers

**Files:**
- Modify: `pages/home/main.jsx`
- Modify: `pages/central-gate/main.jsx`
- Modify: `pages/physical-ai/main.jsx`
- Modify: `pages/wallet/main.jsx`
- Delete: `pages/home/Navigation.jsx`
- Delete: `pages/central-gate/Navigation.jsx`
- Delete: `pages/physical-ai/Navigation.jsx`
- Delete: `pages/wallet/Navigation.jsx`

**Steps:**
1. Import `SiteNavigation` from `pages/shared` in each entry.
2. Pass the page key, locale, locale setter, and direct-path navigation callback.
3. Preserve Physical AI's automatic contrast behavior through a shared theme option.
4. Remove obsolete local Navigation imports and implementations.

### Task 3: Migrate About and Download

**Files:**
- Modify: `pages/about/main.jsx`
- Modify: `pages/about/App.jsx`
- Modify: `pages/about/about.css`
- Modify: `pages/down/main.jsx`
- Modify: `pages/down/App.jsx`
- Modify: `pages/down/down.css`

**Steps:**
1. Move locale ownership to each entry wrapper and render `SiteNavigation` beside page content.
2. Pass locale into About and Download so navigation and content remain synchronized.
3. Remove duplicated top header and global menu arrays from both page components.
4. Keep About's chapter navigation as a page-local overlay and trigger.
5. Remove or scope obsolete header styles that could override the shared component.

### Task 4: Verify behavior and presentation

**Files:**
- Verify: all files above

**Steps:**
1. Run `pnpm run build`; expect all six Vite entry points to build successfully.
2. Run `git diff --check`; expect no whitespace errors.
3. At desktop width, inspect every page for seven visible global links in identical order.
4. At mobile width, open INDEX on every page and verify the same seven items.
5. Switch English/Chinese and verify navigation labels change.
6. Verify each global destination reaches its exact path.
7. Verify Physical AI contrast changes over its dark final section.
8. Verify About's chapter navigation remains usable independently.
9. Verify downward scrolling hides the header and upward scrolling reveals it on representative desktop and mobile pages.
