# Manifesto

## Core Position

This website enforces a strict engineering philosophy:

| Principle                       | Meaning                         | Enforcement                       |
| ------------------------------- | ------------------------------- | --------------------------------- |
| Architecture over improvisation | Structure before clever         | Typed config, documented patterns |
| Security over convenience       | Protection before features      | CSP, no analytics, audit mode     |
| Speed with ethics               | Performance with responsibility | SWD carbon calc, system fonts     |
| Privacy by design               | No tracking by default          | Zero third-party requests         |

---

## What This Site Is

| Function            | Description                         |
| ------------------- | ----------------------------------- |
| Identity page       | Professional presence, multilingual |
| Technical inventory | Public catalog of work and tools    |
| Static platform     | Astro-generated, zero-runtime       |
| Publication base    | Future technical writing platform   |
| Navigation feel     | SPA-like continuity, static-first   |

---

## What This Site Is NOT

| Anti-Goal                 | Rationale                        |
| ------------------------- | -------------------------------- |
| No surveillance analytics | User privacy is non-negotiable   |
| No ad-tech integrations   | Conflicts with user interests    |
| No client-side frameworks | Unnecessary complexity and bloat |
| No external dependencies  | Attack surface reduction         |
| No webfonts               | Performance and reliability      |
| No tracking cookies       | Privacy by default               |

---

## Technical Philosophy

### Zero-Runtime Principle

**Rule**: If CSS can do it, JavaScript shouldn't.

**UX expectation**: The site should feel SPA-like in continuity and responsiveness, while the delivery model remains SSG and zero-JS by default.

**Examples**:

- X-ray mode: `:has(#arch:target)` — zero JS
- Audit mode: `:has(#audit:target)` — zero JS
- 3D layers: CSS transforms + lazy interaction — minimal JS

**Rationale**: Less code = fewer bugs = faster = more secure.

---

### System Fonts Principle

**Rule**: No webfont loading permitted.

**Stack**:

```css
--font-sans: 'Segoe UI', 'San Francisco', Roboto, system-ui, sans-serif;
```

**Rationale**:

- 0ms font loading delay
- 0KB transferred
- 100% reliable (no FOUC, no flash)
- Native platform appearance

---

### Privacy Principle

**Rule**: No data leaves the browser unless explicitly requested by the user.

**What we don't collect**:

- No analytics
- No cookies (third-party)
- No session tracking
- No IP logging
- No form submissions

**What we do**:

- Theme preference: `localStorage` only, never transmitted
- Language: URL-based, build-time routing

---

### Sustainability Principle

**Rule**: Measure and minimize environmental impact.

**Implementation**:

- Carbon footprint calculator (SWD v4 model)
- Browser-native computation (Performance API + TextEncoder)
- Cached-resource-aware calculation

**Target**: Minimal transfer = minimal emissions.

---

## Design Philosophy

### Restrained Aesthetics

| Quality    | Implementation                      |
| ---------- | ----------------------------------- |
| Calm       | Light font weights, muted colors    |
| Clear      | Fixed hierarchy, consistent spacing |
| Consistent | Shared `home-*` vocabulary          |
| Compact    | `max-w-2xl`, tight gaps             |

### Typography Rules

1. **Semantic classes only** — no arbitrary `text-*` utilities
2. **Hierarchy matching** — h1 = display, h2 = section, h3 = card
3. **Light weights for large text** — 300 weight for headlines
4. **Negative tracking on headlines** — tighter appearance
5. **Uppercase labels only** — `home-micro-label` uses `text-transform: uppercase`

---

## Security Philosophy

### Defense in Depth

| Layer        | Control                              |
| ------------ | ------------------------------------ |
| Network      | CSP `default-src 'self'`             |
| Dependency   | Minimal surface, Renovate automation |
| Privacy      | No third-party requests              |
| Verification | Public PGP contact, security.txt     |

### Attack Surface

**Goal**: Minimize what can be attacked.

**Current surface**:

- Static HTML (no injection vectors)
- No user input (no XSS)
- No external requests (no MITM leakage)
- No runtime frameworks (no prototype pollution)

---

## Accessibility Philosophy

### Built-In, Not Bolted-On

| Feature        | Implementation                         |
| -------------- | -------------------------------------- |
| Skip link      | `#main-content` target                 |
| Reduced motion | `prefers-reduced-motion` respected     |
| Focus visible  | Custom `:focus-visible` outline        |
| Audit mode     | `#audit` hash for real-time inspection |

### Principle

Accessibility is verified through **structural modes**, not checklists.

---

## Operations Philosophy

### Automated Enforcement

| Gate        | Tool                     | Fail Condition      |
| ----------- | ------------------------ | ------------------- |
| Validation  | `npm run check`          | Astro errors        |
| Types       | `npm run typecheck`      | TypeScript errors   |
| Build       | `npm run build`          | Compilation failure |
| Tests       | `npm run test:e2e`       | E2E failure         |
| Performance | `npm run lighthouse:ci`  | Score < 100         |
| Security    | `npm run security-audit` | High/critical vuln  |

**Rule**: All gates must pass. No exceptions.

---

## Identity

This site represents:

- **Anna Zezulka** — professional identity
- **Engineering rigor** — architecture over trends
- **Ethical defaults** — privacy, sustainability, accessibility
- **Technical clarity** — documentation over mystery

---

## Non-Goals (Explicit)

The following will **never** be added:

| Feature                | Reason                              |
| ---------------------- | ----------------------------------- |
| Google Analytics       | Surveillance capitalism             |
| Cookie banners         | Created by tracking; we don't track |
| A/B testing frameworks | No experimentation on users         |
| Chat widgets           | Third-party attack surface          |
| Social media embeds    | External requests, tracking         |
| Comment systems        | Complexity + moderation burden      |
| CMS integrations       | Static generation is sufficient     |
| JavaScript frameworks  | Astro + vanilla is enough           |

---

## Commitment

This document is a **constraint**, not decoration.

Any change that violates these principles should be:

1. Rejected in code review
2. Flagged by CI if it slips through
3. Reverted immediately if deployed

**Architecture over improvisation** means: when in doubt, consult this document first.
