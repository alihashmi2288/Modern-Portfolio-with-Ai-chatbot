# Syed Ali Hashmi — Brand Identity Guidelines

> Official brand identity and logo usage guide for Syed Ali Hashmi (Software Engineer, Full-Stack Developer & AI Automation Specialist). Strictly aligned with the Vercel Geist design system.

---

## 1. The Logo & Visual Core

- **The Identifier**: "The Terminal Apex"
- **The Concept**: An architectural equilateral **'A'** embedding an upward terminal chevron and a negative-space deployment vector. It represents engineering precision, developer velocity, and command-line mastery.
- **Form Factor**: 
  - **Master Symbol**: `public/brand/master/brand-symbol.svg`
  - **Small-Scale Cut**: `public/brand/master/brand-symbol-small.svg` (optimized for 16px to 32px)
  - **Horizontal Lockup**: `public/brand/master/brand-horizontal.svg`
  - **Stacked Lockup**: `public/brand/master/brand-stacked.svg`

---

## 2. Clear Space & Proportions

- **Clear Space**: Maintain an exclusion zone around the mark equal to **0.5 × the height of the symbol's inner chevron** (approximately 24px at 256px canvas scale).
- **No intrusion**: No text, icons, buttons, or page dividers should encroach on this exclusion zone.

---

## 3. Minimum Display Sizes

| Variant | Minimum Digital Size | File Source | Notes |
|---|---|---|---|
| **Horizontal Lockup** | 120 px wide | `brand-horizontal.svg` | For desktop navigation headers and documentation |
| **Stacked Lockup** | 96 px wide | `brand-stacked.svg` | For presentation title cards and badges |
| **Standalone Symbol** | 24 px × 24 px | `brand-symbol.svg` | For app bars, mobile headers, and footers |
| **Micro Favicon** | 16 px × 16 px | `brand-symbol-small.svg` / `favicon.ico` | High-contrast widened counters for browser tabs |

---

## 4. Colour Palette & Tokens

Consistent with `DESIGN.md` (Vercel Geist System):

| Token | HEX | RGB | Use Case |
|---|---|---|---|
| **Ink (Primary)** | `#171717` | `rgb(23, 23, 23)` | Default mark fill on light canvas (`#fafafa`) |
| **Canvas** | `#fafafa` | `rgb(250, 250, 250)` | Default background sheet |
| **Elevated Surface** | `#ffffff` | `rgb(255, 255, 255)` | Card backgrounds, reversed mark fill |
| **Hairline Border** | `#ebebeb` | `rgb(235, 235, 235)` | 1px card and avatar container dividers |
| **Mute Text** | `#8f8f8f` | `rgb(143, 143, 143)` | Lockup subtitle ("SOFTWARE & AI ENGINEER") |
| **Accent Blue** | `#0070f3` | `rgb(0, 112, 243)` | Hyperlinks, active states, pricing highlights |

### Approved Background Pairings
1. **Ink on Canvas**: `#171717` mark on `#fafafa` canvas (Default Light Mode).
2. **Ink on White**: `#171717` mark on `#ffffff` elevated cards.
3. **Reversed (White on Dark)**: `#ffffff` mark on `#000000` or `#171717` terminal surfaces / dark mode.
4. **App Tile**: White mark centered on `#171717` rounded squircle tile (`brand-symbol-app-icon.svg`).

---

## 5. Typography Standards

- **Display Headline**: **Geist Sans** 600 with tight negative tracking (`-0.4px` on nav, `-2px` on large lockups).
- **Technical Eyebrows & Subtitles**: **Geist Mono** 500 in uppercase with open tracking (`+1.5px` to `+2px`).
- **Fallbacks**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

---

## 6. Rules & Misuse ("Don'ts")

- ❌ **Do not distort**: Never stretch, compress, skew, or rotate the mark.
- ❌ **Do not apply drop shadows or glow effects**: The Geist system relies on flat hairlines and whisper elevations, not heavy glows.
- ❌ **Do not recolor arbitrarily**: Do not fill with random vibrant colors outside `#171717`, `#ffffff`, or approved brand mono tokens.
- ❌ **Do not rearrange lockup elements**: Keep relative proportions between the symbol and typography locked as provided in `brand-horizontal.svg`.
- ❌ **Do not use fake knockouts**: Always use the provided vector files with genuine compound paths (`fill-rule="evenodd"`).

---

## 7. Delivery Manifest

```
public/
├── favicon.ico                         # Multi-resolution 16/32/48 ICO
├── favicon.svg                         # Vector scalable tab icon
├── apple-touch-icon.png                # iOS 180x180 app icon
├── icon-192.png                        # Android / PWA standard icon
├── icon-512.png                        # High-res PWA splash icon
├── site.webmanifest                    # Modern web app manifest
└── brand/
    ├── master/                         # Source vector masters
    │   ├── brand-symbol.svg            # 256x256 Master symbol
    │   ├── brand-symbol-small.svg      # 16px/24px Optical small-cut
    │   ├── brand-horizontal.svg        # 960x256 Horizontal lockup
    │   └── brand-stacked.svg           # 512x512 Stacked lockup
    ├── export/                         # Production deliverables
    │   ├── brand-symbol-black.*        # Black SVGs & PNGs (32-1024px)
    │   ├── brand-symbol-white.*        # White SVGs & PNGs (32-1024px)
    │   ├── brand-symbol-mono-171717.*  # Brand mono SVGs & PNGs
    │   ├── brand-symbol-app-icon.*     # App tile icons
    │   ├── brand-horizontal-*.*        # Horizontal lockup exports
    │   └── brand-stacked-*.*           # Stacked lockup exports
    ├── presentation.html               # Interactive presentation board
    ├── slides/                         # Slide PNGs (slide-01 to slide-05)
    └── BRAND_GUIDELINES.md             # This document
```
