# 🎨 CareerCraft UI Design System, Theme Governance & UX Policy

This document is the **Single Source of Truth for visual design system governance** within CareerCraft. All engineering team members and AI coding agents MUST adhere to these design tokens, component rules, theme guidelines, and responsive/accessibility specifications when creating or modifying user interfaces.

---

## 1. Design Philosophy

CareerCraft is a modern, enterprise-grade AI career platform. The visual aesthetic MUST reflect:

```text
Professional · Trustworthy · Modern · Accessible · AI-enabled · European SaaS · Responsive · Clean
```

The design priorities are **usability, readability, accessibility, consistency, and user confidence**. Avoid visual novelty, excessive neon colors, overly heavy drop shadows, or unmanaged gradients.

---

## 2. Official Color System

CareerCraft enforces an authoritative color palette across Light and Dark themes.

### 2.1 Light Mode Palette

| Token Name | Hex Code | Primary Usage |
| :--- | :---: | :--- |
| **Primary** | `#2563EB` | Primary CTAs, active links, selected states, focus indicators |
| **Primary Hover** | `#1D4ED8` | Hover states for primary controls |
| **Navy** | `#0F172A` | Primary headings, brand accents, dark surfaces |
| **AI Accent** | `#0D9488` | AI Assistant badges, AI suggestions, teal accents |
| **Success** | `#059669` | Positive status, complete state, confirmation badges |
| **Warning** | `#D97706` | ATS warnings, caution alerts, incomplete indicators |
| **Error** | `#DC2626` | Validation errors, destructive actions |
| **Background** | `#F8FAFC` | Main application backdrop |
| **Surface** | `#FFFFFF` | Cards, panels, modals, dropdown containers |
| **Border** | `#E2E8F0` | Structural dividers, card borders, input borders |
| **Text Primary** | `#0F172A` | Primary body text and titles |
| **Text Secondary** | `#475569` | Subtitles, labels, secondary details |
| **Text Muted** | `#64748B` | Helper text, disabled indicators, captions |

### 2.2 Dark Mode Palette

| Token Name | Hex Code | Primary Usage |
| :--- | :---: | :--- |
| **Background** | `#020617` | Deep slate application backdrop |
| **Surface** | `#0F172A` | Main panels, card backgrounds |
| **Elevated** | `#1E293B` | Modals, dropdowns, floating cards |
| **Border** | `#334155` | Dark mode dividers and borders |
| **Text Primary** | `#F8FAFC` | Primary dark-mode text and headings |
| **Text Secondary** | `#CBD5E1` | Secondary text, sub-headings |
| **Text Muted** | `#94A3B8` | Captions, disabled labels |
| **Primary** | `#3B82F6` | Primary CTAs, active states in dark mode |
| **AI Accent** | `#2DD4BF` | AI indicators, teal glowing accents in dark mode |
| **Success** | `#34D399` | Dark mode success indicators |
| **Warning** | `#FBBF24` | Dark mode caution alerts |
| **Error** | `#F87171` | Dark mode error badges and alerts |

---

## 3. Semantic Color Usage

Colors MUST NOT be used arbitrarily:

* **Primary Blue (`#2563EB` / `#3B82F6`)**: Used for primary action buttons, active navigation items, active tab highlights, and focus rings.
* **Navy (`#0F172A`)**: Used for high-emphasis structural headers and brand elements.
* **AI Teal (`#0D9488` / `#2DD4BF`)**: Used **exclusively** for AI features (AI Assistant, AI prompt badges, ATS recommendations, STAR answer generators).
* **Success (`#059669` / `#34D399`)**: Used for completed steps, active status, ATS high scores.
* **Warning (`#D97706` / `#FBBF24`)**: Used for moderate ATS issues, incomplete profile warnings.
* **Error (`#DC2626` / `#F87171`)**: Used for form field validation errors and destructive actions.

---

## 4. Design Tokens & CSS Variables

All colors and spacing variables MUST be exposed via CSS custom properties in `src/index.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-navy: #0F172A;
  --color-ai: #0D9488;
  --color-background: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;
}

[data-theme="dark"], .dark {
  --color-primary: #3B82F6;
  --color-ai: #2DD4BF;
  --color-background: #020617;
  --color-surface: #0F172A;
  --color-border: #334155;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #CBD5E1;
  --color-text-muted: #94A3B8;
}
```

Hardcoded random hex codes (`bg-[#2563eb]`, `text-[#475569]`) MUST NOT be scattered across components.

---

## 5. Typography Hierarchy

CareerCraft uses the Inter font family with standard fallback stacks:

```text
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Hierarchy Rules

| Scale | Size / Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **H1** | `2.25rem` (36px) / 1.2 | `700` (Bold) | Major page headers |
| **H2** | `1.5rem` (24px) / 1.3 | `600` (Semi-bold) | Section titles, card headers |
| **H3** | `1.125rem` (18px) / 1.4 | `600` (Semi-bold) | Sub-section headers, modal titles |
| **Body** | `0.875rem` (14px) / 1.5 | `400` (Regular) | Primary content, form inputs |
| **Small / Helper** | `0.75rem` (12px) / 1.4 | `500` (Medium) | Captions, badges, error messages |

---

## 6. Spacing Rhythm & Container Bounds

Layout spacing MUST follow an 8pt grid rhythm (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`):

* **Page Container**: `max-w-7xl` (`1280px`), with padding `px-4 sm:px-6 lg:px-8`.
* **Card Padding**: `p-4 sm:p-6`.
* **Form Grid Gaps**: `gap-4 md:gap-6`.

---

## 7. Responsive Breakpoints

Components MUST be validated across 9 target viewports:

```text
320px · 375px · 390px · 430px · 768px · 1024px · 1280px · 1440px · 1920px
```

### Mobile Layout Rules
* Horizontal scrolling on the main page viewport is STRICTLY PROHIBITED.
* Buttons and inputs MUST occupy comfortable touch targets (minimum `44px × 44px`).
* Kanban boards and grid layouts MUST collapse to single-column or scrollable containers on screens below `768px`.

---

## 8. Navbar Specifications

The Navbar ([`src/components/layout/Navbar.tsx`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/src/components/layout/Navbar.tsx)) is the primary header component:

1. **Sticky Header**: Remains fixed at `top-0 z-30` with backdrop blur (`backdrop-blur-xl`).
2. **Unified Control Group**: Houses a cohesive `[ Language Selector | Theme Toggle | Notifications | Profile ]` cluster.
3. **Responsive Stability**: Controls MUST NOT wrap, clip, or push the search bar off-screen. On screens `<768px`, search input collapses to an icon toggle or compact bar.

---

## 9. Theme Architecture & Toggle Rules

* Theme state is managed centrally via `ThemeContext` (`src/context/ThemeContext.tsx`) and consumed via `useTheme()` (`src/hooks/useTheme.ts`). Components MUST NOT maintain independent local theme states.
* State persists in `localStorage` under the canonical key `careercraft_theme`.
* State syncs synchronously with `document.documentElement.dataset.theme` (`'light'` | `'dark'`) and `document.documentElement.classList.toggle('dark')`.
* Tailwind CSS v4 is configured with `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *, .dark, .dark *));` in `src/index.css` to bridge custom data-theme / class attributes with Tailwind `dark:` utilities.
* The theme toggle button is present in the Navbar (`Navbar.tsx`) and Settings page (`ThemeToggle.tsx`), both sharing the single `useTheme()` context.
* Toggling MUST be instantaneous without causing layout shift or flicker.

---

## 10. Language Switcher Rules

* Available in both Navbar and Settings page.
* Dropdown or quick-toggle MUST present clear flags and native language names (`🇬🇧 English`, `🇩🇪 Deutsch`, `🇸🇦 العربية`).
* Dropdown popover MUST align right in LTR mode (`ltr:right-0`) and left in RTL mode (`rtl:left-0`).

---

## 11. Go-to-Top Navigation Button

The Go-to-Top component ([`src/components/ui/ScrollToTop.tsx`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/src/components/ui/ScrollToTop.tsx)):

* Appears when window scroll Y exceeds `400px`.
* Smoothly scrolls to top on click (`window.scrollTo({ top: 0, behavior: 'smooth' })`).
* Positioned floating fixed at bottom-end (`fixed bottom-6 ltr:right-6 rtl:left-6 z-40`).
* Fully accessible with keyboard `Enter`/`Space` support and `aria-label`.

---

## 12. RTL & Arabic Mirroring Rules

Arabic (`ar`) runs in Right-to-Left mode (`dir="rtl"`):

* **Logical Properties**: Use `ps-*` / `pe-*` or explicit `ltr:mr-* rtl:ml-*`, `ltr:border-r rtl:border-l`.
* **Icon Mirroring**: Mirror directional navigation arrows (back/next). Do NOT mirror symmetric brand icons, search icons, settings icons, theme sun/moon, or user profile avatars.
* **Dropdown Alignment**: Dropdowns MUST align to the start edge of their triggers in RTL mode.

---

## 13. Accessibility Standards (WCAG 2.1 AA)

* **Color Contrast**: Body text MUST achieve a minimum contrast ratio of `4.5:1` against backgrounds in both Light and Dark modes.
* **Focus Indicators**: All interactive elements (buttons, inputs, links, dropdowns) MUST show a prominent focus ring (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`).
* **Screen Reader Labels**: Icon-only buttons MUST include explicit `aria-label` or `sr-only` text.

---

## 14. Component Consistency Standards

All components MUST share uniform styling primitives:

* **Buttons**: `rounded-2xl`, font weight `font-semibold` or `font-medium`, smooth transition `transition-all duration-200`.
* **Cards**: `rounded-3xl` or `rounded-2xl`, subtle border `border border-slate-200 dark:border-white/10`, background surface `bg-white dark:bg-slate-900`.
* **Inputs**: `rounded-2xl`, padding `px-4 py-3`, focus ring `focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`.

---

## 15. Interaction States

Every interactive element MUST implement distinct visual representations for all 6 states:

```text
Default → Hover → Focus-Visible → Active → Disabled → Loading
```

Disabled buttons MUST have `cursor-not-allowed opacity-50` and prevent click handlers.

---

## 16. Form Design Standards

* Labels MUST be placed above input fields using `labelClasses` (`block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-2`).
* Validation error messages MUST render below the field in red text (`text-xs text-rose-600 dark:text-rose-400 mt-1.5`).
* Placeholders MUST NOT replace formal `<label>` elements.

---

## 17. AI Visual Language

* AI components MUST feature the teal accent token (`#0D9488` in Light, `#2DD4BF` in Dark) alongside a subtle `Sparkles` icon.
* Avoid neon glow effects or distracting background animations.

---

## 18. Motion & Animation Rules

* Use subtle transitions (`transition-all duration-200`).
* Respect `prefers-reduced-motion`: disable animations when user requests reduced motion.

---

## 19. Visual Regression Expectations

Every route (`/dashboard`, `/cv-builder`, `/job-search`, `/saved-jobs`, `/applications`, `/interview-prep`, `/ai-assistant`, `/settings`) MUST be visually verified in:

```text
English Light · English Dark · German Light · German Dark · Arabic Light · Arabic Dark
```

---

## 20. Mobile UX Quality

* Stack multi-column grids into single columns on mobile viewports.
* Ensure drawer and modal dialogs do not exceed viewport heights on mobile devices (`max-h-[90vh] overflow-y-auto`).

---

## 21. Cross-Language Layout Adaptation

* German text expansion: Ensure buttons, tabs, and table headers wrap or adjust width gracefully without clipping long German compound words.
* Arabic typography: Ensure line-height for Arabic text supports diacritics without clipping text bounds (`leading-relaxed`).

---

## 22. Automated & Build Validation Requirements

All UI changes MUST pass:
1. `npm run i18n:check`
2. `npm test`
3. `npm run build`

---

## 23. AI Coding Agent UI Governance (20 Mandatory Rules)

1. **Inspect Before Modifying**: Inspect existing component styles before editing.
2. **Use Design Tokens**: Use approved design tokens; never inject arbitrary hex codes.
3. **Preserve Theme Parity**: Test both Light Mode and Dark Mode for every change.
4. **Preserve Direction Parity**: Test both LTR and RTL rendering for every change.
5. **No Parallel Color Systems**: Use `--color-primary`, `--color-surface`, `--color-border`.
6. **Maintain Component Primaries**: Use standard `card-base`, `section-title`, `btn` utility classes.
7. **Verify Touch Targets**: Ensure mobile buttons have minimum 44px touch targets.
8. **Check Focus Rings**: Ensure interactive controls display visible focus rings.
9. **Check Contrast Ratios**: Maintain WCAG AA 4.5:1 contrast for all text.
10. **Prevent Horizontal Scroll**: Ensure no horizontal scrollbar appears on viewports down to 320px.
11. **Do Not Mirror Symmetric Icons**: Keep search, settings, and profile icons un-mirrored in RTL.
12. **Mirror Directional Arrows**: Mirror back/next arrows in RTL mode.
13. **Keep AI Accent Teal**: Use teal accents exclusively for AI components.
14. **Preserve Form Labels**: Never remove `<label>` tags in favor of placeholder text.
15. **Respect Reduced Motion**: Apply `motion-reduce:transition-none` where applicable.
16. **Test German Word Length**: Verify layout fit for long German text strings.
17. **Test Mobile Stack**: Verify grid stacking on screens below 768px.
18. **Never Modify Business Logic**: Change only presentation and styling when performing UI tasks.
19. **Run Automated Build & Tests**: Run `npm run i18n:check`, `npm test`, and `npm run build` before completing work.
20. **Report Visual Debt**: Explicitly document unresolved visual debt in final report.
