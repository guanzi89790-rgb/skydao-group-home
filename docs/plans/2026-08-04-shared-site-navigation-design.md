# Shared Site Navigation Design

## Goal

Replace the six page-specific top navigation implementations with one shared component while preserving page-specific visual themes, language switching, and About's chapter navigation.

## Architecture

Create `pages/shared/SiteNavigation.jsx` as the single source for global navigation labels, destinations, desktop links, language controls, and the mobile INDEX menu. The component receives `locale`, `onLocaleChange`, `currentPage`, and theme options. All destinations use real site paths: `/`, `/central-gate/`, `/physical-ai/`, `/wallet/`, `/#art`, `/#aies`, and `/about/`.

Create `pages/shared/site-navigation.css` for structural and responsive styles. Existing page styles continue to provide theme tokens, but page-specific selectors must not own navigation markup or behavior. The component supports light, dark, and Physical AI's automatic dark-section state through a class supplied by a small page hook or component option.

Home, Central Gate, Physical AI, and Wallet import the shared component from their entry files. About and Download move locale state to their entry wrappers so the shared navigation and page content use the same locale. About retains its chapter overlay as a separate in-page control; it no longer serves as the global mobile menu. Download removes its duplicate global navigation arrays and header markup.

## Success Criteria

- Every page renders the same seven global destinations in the same order.
- Desktop and mobile navigation share one implementation.
- English and Chinese labels switch together with page content.
- Logo, theme contrast, menu open/close, and all paths work on all six pages.
- About chapter navigation remains available independently.
- Production build succeeds without duplicate page navigation components.

## Scroll Visibility

The shared navigation tracks window scroll direction without changing document layout. After at least 12 pixels of downward movement it translates above the viewport; upward movement reveals it immediately. It remains visible within 24 pixels of the page top and whenever the global INDEX menu is open. The transition is disabled for reduced-motion users.

When visible away from the page top, the navigation uses a theme-aware translucent surface with an 18px backdrop blur. Dark pages use `rgba(4, 6, 7, 0.58)` and light pages use `rgba(248, 248, 250, 0.72)`. Within 24 pixels of the top, background and blur ease back to full transparency over roughly 400ms.

The bottom divider follows the same state transition: it is fully transparent at the page top and fades to a subtle 16% white line on dark glass or 12% dark line on light glass.
