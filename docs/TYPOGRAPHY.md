# Typography System

## Core Principles

| Principle             | Enforcement                       |
| --------------------- | --------------------------------- |
| Restrained hierarchy  | Fixed scale; no arbitrary sizes   |
| System fonts only     | No webfont loading permitted      |
| Calm defaults         | Light weights, subtle tracking    |
| Consistent vocabulary | `home-*` classes across all pages |

---

## Type Scale

### Display Level

| Class                | Element | Mobile  | Desktop | Weight | Leading | Tracking |
| -------------------- | ------- | ------- | ------- | ------ | ------- | -------- |
| `home-display-title` | h1      | 2.25rem | 3rem    | 300    | 1.05    | -0.025em |

### Section Level

| Class                | Element | Mobile  | Desktop | Weight | Leading | Tracking |
| -------------------- | ------- | ------- | ------- | ------ | ------- | -------- |
| `home-section-title` | h2      | 1.75rem | 2rem    | 300    | 1.15    | -0.02em  |

### Card Level

| Class             | Element | Mobile  | Desktop | Weight | Leading | Tracking |
| ----------------- | ------- | ------- | ------- | ------ | ------- | -------- |
| `home-card-title` | h3      | 1.25rem | 1.25rem | 600    | 1.35    | 0        |

### Body Level

| Class                | Usage      | Size     | Weight | Leading | Color     |
| -------------------- | ---------- | -------- | ------ | ------- | --------- |
| `home-body-text`     | Paragraphs | 1rem     | 400    | 1.75    | secondary |
| `home-inline-strong` | Emphasis   | 1rem     | 500    | inherit | strong    |
| `home-subtle-text`   | Metadata   | 0.875rem | 400    | 1.6     | muted     |

### Micro Level

| Class               | Usage         | Size     | Weight | Leading | Tracking | Transform |
| ------------------- | ------------- | -------- | ------ | ------- | -------- | --------- |
| `home-micro-label`  | Labels, links | 0.75rem  | 500    | 1       | 0.08em   | uppercase |
| `home-micro-copy`   | Fine print    | 0.75rem  | 400    | 1.6     | 0        | none      |
| `home-tag-text`     | Tags, badges  | 0.75rem  | 500    | 1       | 0        | none      |
| `home-action-text`  | Buttons       | 0.75rem  | 600    | 1       | 0.01em   | none      |
| `home-social-links` | Nav links     | 0.875rem | 500    | 1       | 0        | none      |

---

## Font Stacks

### Primary (Sans-Serif)

```css
--font-sans: 'Segoe UI', 'San Francisco', Roboto, system-ui, sans-serif;
```

### Platform Overrides

| Platform | Stack                                              |
| -------- | -------------------------------------------------- |
| Windows  | `'Segoe UI'`, system-ui                            |
| Apple    | `'SF Pro Text'`, `'SF Pro Display'`, -apple-system |
| Android  | `Roboto`, `'Noto Sans'`                            |
| Linux    | `'Adwaita Sans'`, `'Cantarell'`, `'Noto Sans'`     |

### Monospace (Code)

```css
--font-mono: Consolas, 'SF Mono', Menlo, 'Noto Mono', ui-monospace, monospace;
```

---

## Color System

### Text Colors

| Variable                 | Light   | Dark    | Usage                  |
| ------------------------ | ------- | ------- | ---------------------- |
| `--color-brand`          | #18181b | #fafafa | Headings, primary text |
| `--color-text-secondary` | #52525b | #a1a1aa | Body copy (default)    |
| `--color-text-muted`     | #71717a | #71717a | Metadata,辅助 text     |
| `--color-text-strong`    | #27272a | #e4e4e7 | Emphasized inline      |

### Color Application Rules

| Class                | Color Variable           | Rationale                        |
| -------------------- | ------------------------ | -------------------------------- |
| `home-display-title` | `--color-brand`          | Maximum prominence               |
| `home-section-title` | `--color-brand`          | Section prominence               |
| `home-card-title`    | `--color-brand`          | Card hierarchy                   |
| `home-body-text`     | `--color-text-secondary` | Reduced contrast for readability |
| `home-subtle-text`   | `--color-text-muted`     | Secondary metadata               |
| `home-micro-label`   | `--color-text-muted`     | Non-primary action               |

---

## Spacing System

### Vertical Rhythm

| Context             | Utility        | Value           | Usage                    |
| ------------------- | -------------- | --------------- | ------------------------ |
| Main container flow | `gap-4`        | 1rem            | Between major elements   |
| Section spacing     | `gap-8`        | 2rem            | Between content sections |
| Category spacing    | `gap-3`        | 0.75rem         | Header to list           |
| Card list           | `gap-4`        | 1rem            | Between cards            |
| Card internal       | `mt-2`, `mt-3` | 0.5rem, 0.75rem | Title to description     |

### Page Padding

| Breakpoint | Horizontal      | Vertical       |
| ---------- | --------------- | -------------- |
| Mobile     | `px-6` (1.5rem) | `py-16` (4rem) |
| Desktop    | `px-6` (1.5rem) | `py-16` (4rem) |

### Card Padding

| Default   | Value        |
| --------- | ------------ |
| All cards | `p-4` (1rem) |

---

## Layout Constraints

| Property       | Value               | Rationale                           |
| -------------- | ------------------- | ----------------------------------- |
| Max width      | `max-w-2xl` (672px) | Optimal line length for readability |
| Mobile padding | `px-6`              | Consistent edge spacing             |
| Centering      | `mx-auto`           | Symmetrical layout                  |

---

## Class Usage Matrix

### Valid Combinations

| Class                | Valid Elements | Invalid Elements |
| -------------------- | -------------- | ---------------- |
| `home-display-title` | h1             | h2, h3, p, span  |
| `home-section-title` | h2             | h1, h3, p        |
| `home-card-title`    | h3             | h1, h2, h4       |
| `home-body-text`     | p, span        | h1-h6            |
| `home-micro-label`   | a, span, small | h1-h6, p         |

### Required Pairings

| Class                | Required/Recommended        | Example                           |
| -------------------- | --------------------------- | --------------------------------- |
| `home-display-title` | `font-semibold` (optional)  | Line 38, `[workspace_slug].astro` |
| `home-section-title` | `font-medium` (optional)    | Line 51, `[workspace_slug].astro` |
| `home-card-title`    | `font-medium` (optional)    | Line 59, `[workspace_slug].astro` |
| `home-micro-label`   | `transition-colors` (links) | Line 66, `[workspace_slug].astro` |

---

## Rules (Enforced)

### Rule 1: Semantic Classes Only

**DO**:

```astro
<h1 class="home-display-title">Title</h1>
<p class="home-body-text">Description</p>
```

**DON'T**:

```astro
<h1 class="text-3xl font-light">Title</h1>
<p class="text-gray-600">Description</p>
```

**Rationale**: Centralized control, consistent appearance.

---

### Rule 2: Hierarchy Matching

| Heading Level | Required Class       |
| ------------- | -------------------- |
| h1            | `home-display-title` |
| h2            | `home-section-title` |
| h3            | `home-card-title`    |

**Rationale**: Visual hierarchy reflects DOM hierarchy.

---

### Rule 3: Body Text Color

`home-body-text` **must** use `--color-text-secondary` (default in CSS).

**DON'T** override with darker colors for "better contrast" — the reduced contrast is intentional for visual calm.

---

### Rule 4: No Webfonts

**NEVER** add:

- `@font-face` declarations
- Google Fonts imports
- `font-family` pointing to external services

**Rationale**: Performance, privacy, reliability.

---

### Rule 5: Light Weights for Large Text

| Class                | Weight | Reason                      |
| -------------------- | ------ | --------------------------- |
| `home-display-title` | 300    | Elegant appearance          |
| `home-section-title` | 300    | Consistent with display     |
| `home-card-title`    | 600    | Card prominence (exception) |

---

### Rule 6: Negative Tracking on Headlines

| Class                | Tracking | Reason           |
| -------------------- | -------- | ---------------- |
| `home-display-title` | -0.025em | Tighter headline |
| `home-section-title` | -0.02em  | Tighter headline |

**DON'T** add positive tracking to headlines.

---

### Rule 7: Uppercase Labels

`home-micro-label` **includes** `text-transform: uppercase` and `letter-spacing: 0.08em`.

**DON'T** apply uppercase to body text or titles.

---

### Rule 8: Line Height Scale

| Size Category      | Leading   |
| ------------------ | --------- |
| Display (2.25rem+) | 1.05-1.15 |
| Card (1.25rem)     | 1.35      |
| Body (1rem)        | 1.75      |
| Micro (0.75rem)    | 1-1.6     |

**Rationale**: Smaller text needs more leading for readability.

---

### Rule 9: Responsive Automation

`home-display-title` and `home-section-title` auto-scale at 640px breakpoint.

**DON'T** add manual `@media` queries for typography — handled in `global.css`.

---

### Rule 10: New Pages Inherit System

Any new page **must**:

1. Import and use `home-*` classes
2. Match spacing conventions (`gap-4`, `py-16`, `px-6`)
3. Use `max-w-2xl` container

**Rationale**: Site-wide visual consistency.

---

## Quick Reference

### Creating a New Section

```astro
<section class="flex flex-col gap-8">
  <h2 class="home-section-title font-medium">Section Title</h2>
  <p class="home-body-text">Section description goes here.</p>

  <ul class="flex flex-col gap-4">
    <li class="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <h3 class="home-card-title font-medium">Card Title</h3>
      <p class="home-body-text mt-2">Card description.</p>
    </li>
  </ul>
</section>
```

### Creating a Back Link

```astro
<a class="home-subtle-text inline-flex items-center gap-1" href="/en/">
  <span>←</span>
  <span>Back</span>
</a>
```

### Creating Metadata Labels

```astro
<span class="home-micro-label">External Link</span>
```

---

## Source of Truth

All typography classes defined in: `src/styles/global.css` (lines 188-280)
