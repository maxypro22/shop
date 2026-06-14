# Shop Five - Shopify Theme Development Context

This document is designed to provide full context to any AI agent taking over the development of the "Shop Five" Shopify theme. It contains the architecture, design guidelines, and technical workarounds implemented so far.

## 1. Project Overview
- **Project Name**: Shop Five Shopify Theme
- **Architecture**: Shopify Online Store 2.0 (OS 2.0) - Supports "Sections Everywhere".
- **Language & Layout**: Arabic (RTL - Right-to-Left orientation natively enforced).
- **Core Objective**: Deliver a highly premium, modern, and lightning-fast e-commerce experience similar to top-tier brands (e.g., Apple, Zara).

## 2. Design System (Premium Modern UI/UX)
Any future UI changes *must* adhere to these aesthetic rules to maintain the premium feel:
- **Colors**: 
  - Backgrounds: Off-white/minimalist (`--bg-main: #fafafa`) to make pure white cards (`--bg-card: #ffffff`) pop.
  - Primary Brand: Deep Slate/Black (`--primary: #0f172a`) instead of generic bright colors.
- **Typography**: Uses Google Font **"Cairo"** for excellent Arabic legibility. Font weights are generally 700-900 for headings.
- **Glassmorphism**: Sticky headers and navigation bars use semi-transparent backgrounds with `backdrop-filter: blur(12px)` for a modern iOS-like effect.
- **Shadows over Borders**: Avoid harsh solid borders. Use ultra-soft, diffused shadows (`rgba(0,0,0,0.03)` to `0.08`).
- **Micro-interactions**: 
  - Buttons must feel tactile: `transform: translateY(-2px)` on hover, and `transform: scale(0.98)` on active/click.
  - Smooth Apple-like spring transitions: `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Product Card Hover**: Implements a custom "Slide-Push" animation. On hover, the primary image slides out left (`-100%`) while the secondary image slides in from the right.

## 3. Key Components & Architecture

### Layouts & Templates
- `layout/theme.liquid`: The master layout. Contains the sticky Glassmorphism header and category pills. **Important Note**: The `hero-video` section is explicitly wrapped in `{% if template == 'index' %}` so it does not render and block content on collection/product pages.
- `templates/product.liquid`: Completely custom product detail page. Features an image gallery (thumbnails), custom variant "pills" instead of dropdowns, and dynamic price/stock logic.
- `templates/search.liquid`: Custom search results page tailored for RTL layout.

### Custom Sections
- `hero-video.liquid`: Full-width auto-playing video. 
  - *Technical Note*: Features a pure CSS cinematic vignette and a `feTurbulence` SVG noise filter for a premium film-grain effect. Optimized with `preload="auto"`.
- `category-pills.liquid`: A horizontal scrolling list of collections.
  - *Technical Workaround*: Contains a "More" (المزيد) button that opens a popup modal. To avoid `z-index` conflicts with the sticky header's stacking context, `script.js` physically appends this modal to `document.body` on DOM load.
- `store-features.liquid`: "Our Promises" grid with complex CSS hover animations (lines drawing out, icons rotating).
- `app-download.liquid`: A premium section to download the iOS/Android app, featuring a 3D-rotated phone mockup that flattens on hover.
- `home-grid.liquid`: The dynamic product grid on the homepage. Users can manually upload images via the Shopify Customizer blocks or auto-sync from a collection.

### Assets
- `assets/styles.css`: Contains all core CSS variables, global rules, and responsive media queries.
- `assets/script.js`: Handles the frontend logic for product variant selection, price updating, thumbnail switching, and modal positioning.
- **Icons**: The theme relies entirely on **Lucide Icons** via CDN (`lucide.createIcons()`).

## 4. Performance Optimizations
- **Lazy Loading**: `loading="lazy"` is heavily utilized on product grids (`snippets/product-card.liquid`) to ensure fast First Contentful Paint (FCP).
- **Video Preloading**: The hero video uses `preload="auto"` for instant playback on the homepage.

## 5. Agent Instructions for Future Tasks
1. **Always use specific tools**: Use `multi_replace_file_content` for CSS/Liquid edits rather than rewriting entire files.
2. **Respect RTL**: Remember that margin/padding for spacing must be mirrored (e.g., `margin-left` spacing an icon from text in English becomes `margin-right` in Arabic).
3. **No Placeholders**: If the user asks for a feature, build the *actual* functional feature. Avoid "Lorem Ipsum" and dummy code.
4. **Maintain Aesthetics**: If you add new buttons or cards, refer to `styles.css` and use existing classes (`btn-action`, `card-content`) or clone their styling. Do not introduce standard browser-default styles.
