# AI Workflow Guide

## Purpose

This document structures project context for AI coding agents to parse efficiently and act correctly.

---

## Project Identity

| Attribute | Value |
|-----------|-------|
| Name | Anna Zezulka Personal Web |
| Type | Static site (Astro) |
| Domain | Professional identity + technical inventory |
| Languages | English (en), Czech (cs) |
| Deployment | Codeberg Pages (`pages` branch) |
| Build Output | `dist/` |
| Styling | Tailwind CSS v4 (native CSS imports) |

---

## Non-Negotiable Constraints

### Security

| Rule | Enforcement |
|------|-------------|
| No secrets in source | CI audit blocks commits |
| No third-party analytics | Manifesto requirement |
| No ad-tech integrations | Manifesto requirement |
| PGP key for security contact | `public/.well-known/security.txt` |

### Performance

| Rule | Limit |
|------|-------|
| JavaScript | Zero-runtime unless feature requires it |
| Webfonts | Forbidden — system fonts only |
| CSS | Tailwind utilities + minimal custom |
| Lighthouse | 100/100/100/100 target |

### Architecture

| Rule | Rationale |
|------|-----------|
| No client frameworks | Reduces complexity and attack surface |
| Zero-JS features preferred | `:has()`, `:target`, CSS variables enable functionality without runtime |
| i18n at build time | Static generation, no runtime language detection |

---

## Agent Behavior Rules

### Writing Code

| Do | Don't |
|----|-------|
| Small, focused patches | Large refactors without approval |
| English in source files | Comments in other languages |
| Preserve minimalist UI | Add visual complexity |
| Use existing typography classes | Create new `text-*` utilities |
| Zero-JS solutions first | Add JavaScript for visual effects |

### File Operations

| Action | Rule |
|--------|------|
| Create files | Only when no existing file can be modified |
| Edit files | Preserve existing structure and patterns |
| Delete files | Only unused files (verify with grep) |
| Move files | Only with explicit user instruction |

### Dependency Changes

| Change | Requirement |
|--------|-------------|
| Add package | Justify necessity; prefer no-dependency solution |
| Update package | Let Renovate handle automatically |
| Remove package | Verify no remaining imports |

---

## Command Reference

### Validation (Run in Order)

```bash
npm run check        # Astro validation
npm run typecheck    # TypeScript check
npm run build        # Build verification
npm run test:e2e     # End-to-end tests
```

### Quality Gates

```bash
npm run lighthouse:ci  # Performance audit
npm run size:check     # Bundle size check
npm run security-audit # Vulnerability scan
```

---

## File Structure Map

```
personal-web/
├── src/
│   ├── layouts/         # Layout.astro (SEO, shell)
│   ├── pages/           # Route definitions
│   │   ├── [lang]/      # Localized routes
│   │   └── en/projects/ # Project detail pages
│   ├── components/
│   │   ├── ui/          # Reusable primitives
│   │   └── home/        # Homepage sections
│   ├── i18n/            # Localization system
│   │   ├── dictionary.ts
│   │   ├── utils.ts
│   │   └── locales/     # en.ts, cs.ts
│   ├── styles/          # global.css (Tailwind + custom)
│   └── scripts/         # Lazy-loaded client JS
├── public/
│   └── .well-known/     # security.txt
├── docs/                # This documentation
└── .woodpecker/         # CI pipeline
```

---

## Feature Patterns

### Zero-JavaScript Features

| Feature | Implementation |
|---------|----------------|
| Theme toggle | Inline script + storage event sync |
| X-ray mode | `#arch` hash + `:has(#arch:target)` |
| Audit mode | `#audit` hash + CSS accessibility overlay |
| 3D layers | `#layers` hash + CSS 3D transforms |

### i18n Pattern

```typescript
// Dictionary
export const dictionary: Record<LanguageCode, TranslationDictionary> = { en, cs };

// Usage
const t = useTranslations(currentLang);
t('key.path');
```

### Typography Pattern

```astro
<!-- Always use semantic classes -->
<h1 class="home-display-title">Page Title</h1>
<h2 class="home-section-title">Section</h2>
<p class="home-body-text">Description</p>
```

---

## Decision Tree for AI Agents

```
New task received
    │
    ├─→ Requires new dependency?
    │   ├─ Yes → Justify necessity → Seek approval
    │   └─ No → Continue
    │
    ├─→ Requires JavaScript?
    │   ├─ Yes → Can CSS do it? (#hash, :has, variables)
    │   │   ├─ Yes → Use CSS
    │   │   └─ No → Minimal JS, lazy-load
    │   └─ No → Continue
    │
    ├─→ Modifying typography?
    │   ├─ Yes → Use home-* classes only
    │   └─ No → Continue
    │
    ├─→ Creating new page?
    │   ├─ Yes → Extend existing layout, inherit classes
    │   └─ No → Continue
    │
    └─→ Implement → Validate → Submit
```

---

## Safety Checklist

Before submitting changes:

- [ ] No secrets or credentials in diff
- [ ] No new runtime dependencies added
- [ ] Typography uses `home-*` classes
- [ ] Zero-JS solution considered first
- [ ] `npm run check` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds

---

## Contact

Security issues: See `public/.well-known/security.txt`
