# Improvement Report

Focused analysis of homepage projects section, about me section, projects page, and about me page.

---

## 1. Visual Consistency

### 1.1 Inconsistent `max-width` on projects index page

**Problem**: The projects index page (`/[lang]/projects/index.astro`) uses `max-w-4xl` (896px), while every other page in the site uses `max-w-2xl` (672px). This creates a jarring width jump when navigating between pages, especially noticeable with Astro View Transitions enabled.

**Files**:

- `src/pages/[lang]/projects/index.astro` — line 28: `max-w-4xl`
- All other pages: `max-w-2xl`

**Fix**: Change the projects index `<main>` to `max-w-2xl` and stack the project cards vertically (single column) instead of using `sm:grid-cols-2`. This also aligns with the carousel pattern already established on the homepage.

---

### 1.2 Inconsistent `gap` on `<main>` containers

**Problem**: The site uses three different `gap` values on the `<main>` container across pages, breaking vertical rhythm:

| Page | Gap |
| --- | --- |
| Homepage (`[lang]/index.astro`) | `gap-8` |
| About, Workspace, Project detail, Root index | `gap-4` |
| Projects index | `gap-10` |

**Files**:

- `src/pages/[lang]/index.astro` — line 30: `gap-8`
- `src/pages/[lang]/projects/index.astro` — line 28: `gap-10`
- `src/pages/[lang]/about/index.astro` — line 20: `gap-4`
- `src/pages/[lang]/[workspace_slug].astro` — line 34: `gap-4`

**Fix**: Normalize all `<main>` containers to `gap-8`, which is the documented section spacing value in `TYPOGRAPHY.md`. Pages that need tighter internal spacing should use `gap-3` or `gap-4` on the inner `<section>` or `<header>` elements (which they already do).

---

### 1.3 Card border-radius inconsistency

**Problem**: Two different card shapes exist across the site:

- Homepage `ProjectCard.astro` uses `rounded-xl` (12px)
- About page cards and workspace page cards use `rounded-lg` (8px)

Both are valid Tailwind radii, but using two different values for the same visual primitive (content card) undercuts the calm, consistent look described in the manifesto.

**Files**:

- `src/components/home/ProjectCard.astro` — line 21: `rounded-xl`
- `src/pages/[lang]/about/index.astro` — lines 33, 39, 51, 57: `rounded-lg`
- `src/pages/[lang]/o-mne/index.astro` — lines 33, 39, 51, 57: `rounded-lg`
- `src/pages/[lang]/[workspace_slug].astro` — line 58: `rounded-lg`

**Fix**: Pick one radius for all content cards site-wide. `rounded-lg` fits the restrained aesthetic better than `rounded-xl` and is used in the majority of cases. Alternatively, update the workspace/about cards to `rounded-xl` to match the projects, if the slightly softer look is preferred.

---

### 1.4 `ProjectCard` overrides the typography system with ad-hoc sizes

**Problem**: `ProjectCard.astro` adds `text-xl sm:text-2xl` to the card title alongside `home-card-title`. This overrides the `1.25rem` size defined for `home-card-title` in `global.css`, breaking the documented type scale. The typography docs (TYPOGRAPHY.md Rule 1) explicitly forbid arbitrary `text-*` utilities on elements that use `home-*` classes.

**File**:

- `src/components/home/ProjectCard.astro` — line 25: `class="home-card-title text-xl sm:text-2xl"`

**Fix**: Remove `text-xl sm:text-2xl`. The `home-card-title` class already defines the correct size (1.25rem / 600 weight). If a larger card title is needed for the carousel context, create a new semantic class (e.g. `home-card-title-lg`) in `global.css` rather than using ad-hoc overrides.

---

### 1.5 `home-display-title` weight conflict

**Problem**: The CSS definition of `home-display-title` in `global.css` sets `font-weight: 300` (light). However, every single usage of this class in the codebase adds `font-semibold` (Tailwind's 600 weight), which completely overrides the CSS definition. This means the documented "light weight for large text" principle (TYPOGRAPHY.md Rule 5) is never actually applied.

**Files**:

- `global.css` — line 175: `font-weight: 300`
- `src/components/home/Hero.astro` — line 16: `home-display-title font-semibold`
- `src/pages/[lang]/projects/index.astro` — line 32: `home-display-title font-semibold`
- `src/pages/[lang]/about/index.astro` — line 24: `home-display-title font-semibold`
- `src/pages/[lang]/o-mne/index.astro` — line 24: `home-display-title font-semibold`
- `src/pages/[lang]/projects/[slug].astro` — line 59: `home-display-title font-semibold`
- `src/pages/[lang]/[workspace_slug].astro` — line 38: `home-display-title font-semibold`

**Fix**: Decide which weight is correct and make them agree. Either:

- **Option A**: Update `global.css` to `font-weight: 600` and remove all `font-semibold` overrides from templates (simplifies markup).
- **Option B**: Remove `font-semibold` from all templates to honor the documented 300 weight (restores the "calm" aesthetic).

Either way, the CSS definition and template usage must match. Update TYPOGRAPHY.md accordingly.

---

### 1.6 "More →" link styling differs between Projects and About sections

**Problem**: On the homepage, the "More →" link in `ProjectsSection.astro` uses inline Tailwind utilities for its styling, while the identical "More →" link in `AboutSection.astro` uses a scoped CSS class (`.about-more-link`). Both achieve the same visual result (muted text, hover to brand color, transparent underline) but through different mechanisms.

**Files**:

- `src/components/home/ProjectsSection.astro` — line 58: inline classes `text-sm font-medium text-[var(--color-text-muted)] underline decoration-transparent ...`
- `src/components/home/AboutSection.astro` — line 15: `about-more-link text-sm ...` + scoped `<style>` block (lines 27-36)

**Fix**: Extract a shared class (e.g. `home-section-more-link`) in `global.css`, or inline both consistently using the same pattern. The current mix is confusing for maintainability.

---

## 2. Component Reuse

### 2.1 About page and O mně page are identical files

**Problem**: `src/pages/[lang]/about/index.astro` and `src/pages/[lang]/o-mne/index.astro` are byte-for-byte identical (3172 bytes each, same content). Both files even generate both `en` and `cs` variants via `getStaticPaths`. This means:

- `/en/about/` and `/en/o-mne/` both render the same English About page
- `/cs/about/` and `/cs/o-mne/` both render the same Czech About page
- There are four generated pages when only two are needed (one per language)

This is not only a code duplication issue but also an SEO problem — duplicate content at different URLs without canonical tags.

**Files**:

- `src/pages/[lang]/about/index.astro`
- `src/pages/[lang]/o-mne/index.astro`

**Fix**: Delete one of the two files and use the i18n routing system (like `routes.workspace` in `dictionary.ts`) to map the localized slug. Add an `about` entry to the `routes` object:

```typescript
export const routes = {
  workspace: { en: 'inventory', cs: 'inventar' },
  about: { en: 'about', cs: 'o-mne' },
} as const;
```

Then create a single `[about_slug].astro` (or similar) page that uses `getStaticPaths` to generate both language-specific URLs. This mirrors the existing workspace page pattern.

---

### 2.2 Card markup is repeated manually instead of using a component

**Problem**: The "card" pattern — `<li class="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">` with an `<h3>` title, `<p>` description, and optional link — is copy-pasted across:

- About page (4 cards × 2 duplicate files = 8 occurrences)
- Workspace page (dynamically rendered, but inline card markup)

These are structurally identical to what `ProjectCard.astro` does, but `ProjectCard` isn't reused because it has project-specific logic (repo links, case study links, etc.).

**Files**:

- `src/pages/[lang]/about/index.astro` — lines 32-43, 49-67
- `src/pages/[lang]/o-mne/index.astro` — lines 32-43, 49-67
- `src/pages/[lang]/[workspace_slug].astro` — lines 57-71

**Fix**: Extract a generic `ContentCard.astro` component:

```astro
---
interface Props {
  title: string;
  description: string;
  link?: string;
}
---
<li class="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-4
           dark:border-zinc-800 dark:bg-zinc-900">
  <h3 class="home-card-title font-medium">{Astro.props.title}</h3>
  <p class="home-body-text mt-2">{Astro.props.description}</p>
  {Astro.props.link && (
    <a href={Astro.props.link} class="home-micro-label mt-3 ..." ...>
      {Astro.props.link}
    </a>
  )}
</li>
```

This would eliminate ~60 lines of duplicated card markup and guarantee visual consistency across all card instances.

---

### 2.3 Contact section on homepage is not extracted into a component

**Problem**: The contact/social section at the bottom of the homepage (`[lang]/index.astro`, lines 35-68) is inlined directly in the page template. It contains a CTA button, email link, LinkedIn, and GitHub icons, all with custom styling. This block:

- Cannot be reused on other pages (e.g. the about page would benefit from it)
- Contains inline `var()` color references mixed with Tailwind utilities, making it harder to maintain
- Is visually significant enough to warrant component extraction

**File**:

- `src/pages/[lang]/index.astro` — lines 35-68

**Fix**: Extract into `src/components/home/ContactSection.astro`. This also sets the stage for reusing it on the about page, creating a clear call to action there as well.

---

### 2.4 `home-social-links` class is defined but never used

**Problem**: `global.css` defines `.home-social-links` with link styles and hover behavior (lines 227-239), but no component in the codebase uses this class. The social links on the homepage are styled with inline Tailwind utilities instead.

**File**:

- `src/styles/global.css` — lines 227-239

**Fix**: Either apply `home-social-links` to the social links in the homepage contact section, or remove the dead CSS.

---

## 3. Content & UX

### 3.1 All project case studies are placeholder content

**Problem**: Every project case study MDX file contains only "Case study coming soon." as the body content. This means clicking "Read case study" on any project card leads to a page with a title, tags, a date, and a single sentence. This is the most significant content gap on the site.

The experience is actively negative: the card promises depth ("Read case study"), but the destination delivers nothing. A visitor interested in the Telperion project, for example, sees a compelling description on the homepage card, clicks through, and lands on an empty page.

**Files**:

- `src/content/projects/telperion-en.mdx` — line 13: "Case study coming soon."
- `src/content/projects/telperion-cs.mdx`
- `src/content/projects/personal-web-en.mdx` — line 13: "Case study coming soon."
- `src/content/projects/personal-web-cs.mdx`
- `src/content/projects/mental-health-app-en.mdx` — line 12: "Case study coming soon. Work in progress."
- `src/content/projects/mental-health-app-cs.mdx`

**Fix**: Either:

- **Option A** (recommended): Write real case study content for at least the Telperion project (the most complete one with a live site and repo). Even 3-4 paragraphs covering problem, approach, and outcome would dramatically improve credibility.
- **Option B**: Remove the "Read case study" button from `ProjectCard` for projects that have no real content. Use a conditional check on body length or a frontmatter flag like `caseStudyReady: false`.

---

### 3.2 About me preview on homepage is too thin

**Problem**: The about section on the homepage (`AboutSection.astro`) consists of just a title, a "More →" link, and a single short paragraph (~15 words in English). It's the thinnest section on the homepage and feels rushed compared to the projects section which has a full carousel with cards, tags, and action buttons.

The about preview text is:

> "Psychology student and software architect. I build for people, not just for machines."

While punchy, this doesn't give a visitor enough reason to click "More →".

**Files**:

- `src/components/home/AboutSection.astro` — lines 22-24
- `src/i18n/locales/en.ts` — line 18: `about.preview`

**Fix**: Expand the about preview to 2-3 sentences that give a more concrete picture. The full about page has rich content (Amnesty volunteer, psychology + tech, static-first architecture). Surface a bit more of that on the homepage. For example:

> "I'm a software architect and psychology student based in Ostrava. I volunteer with Amnesty International and build systems that prioritize people, accessibility, and longevity over trends."

This gives visitors three distinct signals (location, values, approach) instead of one tagline.

---

### 3.3 About page uses email address as card title

**Problem**: On the about page, the last card in the "How I work" section uses `t('about.contact')` as the `<h3>` card title. The value of `about.contact` is `anna@zezulka.me` — a raw email address displayed as a heading. This is semantically odd (an email is not a title) and visually out of place among the other descriptive card titles ("Psychology meets technology", "Volunteer coordinator...").

**Files**:

- `src/pages/[lang]/about/index.astro` — line 59: `<h3 class="home-card-title font-medium">{t('about.contact')}</h3>`
- `src/pages/[lang]/o-mne/index.astro` — line 59: same
- `src/i18n/locales/en.ts` — line 33: `'about.contact': 'anna@zezulka.me'`

**Fix**: Add a proper title key (e.g. `about.card.contact.title`) with a value like "Get in touch" / "Kontakt". Use the email address only in the `<a>` link below, which is where it belongs.

---

### 3.4 About page `mailto:` link displays the `mailto:` prefix

**Problem**: The about page contact card shows the link text as `mailto:anna@zezulka.me` instead of just the email address. The `mailto:` prefix is an implementation detail, not user-facing text.

**File**:

- `src/pages/[lang]/about/index.astro` — line 65: `` {`mailto:${t('about.contact')}`} ``

**Fix**: Change the link text to just `{t('about.contact')}` while keeping the `href` as `mailto:${t('about.contact')}`.

---

### 3.5 Footer has a CSS typo causing broken hover

**Problem**: The first link in `Footer.astro` (the inventory icon) has a typo in its class attribute: `text-(--color-text-muted)sition-colors` instead of `text-(--color-text-muted) transition-colors`. The word "transition" is fused with the color class, which means:

- The `transition-colors` effect doesn't apply to this link
- The color class itself may not parse correctly

**File**:

- `src/components/ui/Footer.astro` — line 26: `class="text-(--color-text-muted)sition-colors hover:text-(--color-brand)"`

**Fix**: Change to `class="text-(--color-text-muted) transition-colors hover:text-(--color-brand)"` (add space and the full `transition` prefix).

---

### 3.6 `personal-web` project card doesn't link to case study

**Problem**: In `ProjectsSection.astro`, the personal-web project is explicitly excluded from getting a case study link via a hardcoded check: `project.slug !== 'personal-web' ? project.slug : undefined`. However, a case study MDX file exists for this project (`personal-web-en.mdx`, `personal-web-cs.mdx`) and has the same placeholder content as the others. This special-casing creates an inconsistency — the Telperion project gets a case study link despite also having placeholder content.

**File**:

- `src/components/home/ProjectsSection.astro` — line 83: hardcoded slug check

**Fix**: Once real case studies are written, remove this special-casing. If case studies remain placeholders, apply the filtering consistently (no case study link for any project with placeholder content).

---

### 3.7 Hero component contains a TODO for the avatar image

**Problem**: There's a `<!-- TODO: Replace /images/avatar.jpg with a real photo -->` comment in `Hero.astro` (line 9). The file `public/images/avatar.jpg` does exist (158KB), so either the TODO is stale (the real photo has been added but the comment wasn't removed) or the current image is a placeholder.

**File**:

- `src/components/home/Hero.astro` — line 9

**Fix**: Verify whether the current `avatar.jpg` is the intended photo. If yes, remove the TODO comment. If not, replace the image and then remove the comment.

---

## 4. Quick Wins

The following five changes would have the biggest visible impact with the least code changed, ranked by impact-to-effort ratio:

### Quick Win 1: Fix the Footer CSS typo

**Impact**: Fixes a broken hover interaction visible on every page.
**Effort**: 1-line edit.
**File**: `src/components/ui/Footer.astro` — line 26.
**Change**: `text-(--color-text-muted)sition-colors` → `text-(--color-text-muted) transition-colors`.

---

### Quick Win 2: About page — add a proper card title and fix mailto display

**Impact**: Fixes two content issues (raw email as heading, `mailto:` prefix in user-facing text) on the about pages.
**Effort**: Add one i18n key, edit 2 lines per language file.
**Files**: `en.ts`, `cs.ts`, `about/index.astro`, `o-mne/index.astro`.

---

### Quick Win 3: Remove ad-hoc `text-xl sm:text-2xl` from ProjectCard

**Impact**: Fixes a documented typography violation. Card titles render at the correct `1.25rem` defined by `home-card-title`.
**Effort**: Remove 2 classes from 1 line.
**File**: `src/components/home/ProjectCard.astro` — line 25.

---

### Quick Win 4: Delete the duplicate about page

**Impact**: Eliminates code duplication (75 lines), removes duplicate URL paths, prevents SEO issues.
**Effort**: Delete one file, add one route entry to `dictionary.ts`, create one new dynamic page file.
**Files**: Delete `src/pages/[lang]/o-mne/index.astro`, update `src/i18n/dictionary.ts`, create `src/pages/[lang]/[about_slug].astro`.

---

### Quick Win 5: Normalize `max-width` and `gap` across all pages

**Impact**: Every page transition feels smooth because content width and spacing are uniform.
**Effort**: Change 2 class values across 2 files.
**Files**: `src/pages/[lang]/projects/index.astro` (change `max-w-4xl` → `max-w-2xl`, `gap-10` → `gap-8`).
