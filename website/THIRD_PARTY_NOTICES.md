# Third-party icons

Interface icons are selected from Iconify's open-source icon collections. No interface icon paths are drawn or maintained in this repository. The existing BITree logo remains unchanged.

| Collection | Iconify package | License | Usage |
| --- | --- | --- | --- |
| Lucide | `@iconify-json/lucide` | ISC, with MIT notices for Feather-derived icons | Interface, navigation, theme, and feature icons |
| Simple Icons | `@iconify-json/simple-icons` | CC0 1.0 Universal | GitHub, Android, Apple/iOS/macOS, and Linux identifiers |
| Tabler Icons | `@iconify-json/tabler` | MIT | Windows identifier |

Sources:

- Lucide: https://lucide.dev/ and https://icon-sets.iconify.design/lucide/
- Simple Icons: https://simpleicons.org/ and https://icon-sets.iconify.design/simple-icons/
- Tabler Icons: https://tabler.io/icons and https://icon-sets.iconify.design/tabler/
- Build-time renderer: https://github.com/natemoo-re/astro-icon

Full upstream license notices, including the Lucide/Feather and Simple Icons trademark notices, are distributed in [`public/icon-licenses.txt`](public/icon-licenses.txt) and copied to the deployed website as `icon-licenses.txt`. Brand marks remain subject to the rights and usage guidelines of their respective owners.

## Adding icons

Select an existing Iconify icon and add its name to `src/icons/catalog.mjs`. The shared catalog controls both the component aliases and the integration's collection allowlist. `src/components/Icon.astro` uses `astro-icon` to embed official SVG data into static HTML at build time; visitors do not need an Iconify CDN connection or JavaScript to display the icons.
