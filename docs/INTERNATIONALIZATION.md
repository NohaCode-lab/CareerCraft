# 🌐 CareerCraft Internationalization (i18n) & RTL Architecture

## 1. Overview

CareerCraft features a comprehensive internationalization (i18n) and Right-to-Left (RTL) layout engine built directly into the React SPA framework. The application provides localized user interface text, dynamic direction mirroring, and contextual title translations across all application modules.

---

## 2. Supported Languages

The application natively supports three locale configurations:

| Language | Code | Text Direction | Default Alignment | Status |
| :--- | :---: | :---: | :---: | :---: |
| **English** | `en` | Left-to-Right (`ltr`) | Left | Primary Default |
| **German** | `de` | Left-to-Right (`ltr`) | Left | Fully Supported |
| **Arabic** | `ar` | Right-to-Left (`rtl`) | Right | Fully Supported |

---

## 3. Translation Dictionary Architecture

Translation dictionaries are centralized in a strongly typed dictionary module:

* **Source File**: [`src/utils/i18n.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/src/utils/i18n.ts)
* **Structure**: Dictionaries export `translations.en`, `translations.de`, and `translations.ar`.
* **Utility Function**: `t(key, language)` safely retrieves the translated string for the active locale.

```typescript
// Implementation: src/utils/i18n.ts

export const translations = {
  en: {
    dashboard: 'Dashboard',
    jobSearch: 'Job Search',
    savedJobs: 'Saved Jobs',
    notifications: 'Notifications',
  },
  de: {
    dashboard: 'Übersicht',
    jobSearch: 'Stellensuche',
    savedJobs: 'Gespeicherte Stellen',
    notifications: 'Benachrichtigungen',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    jobSearch: 'البحث عن وظائف',
    savedJobs: 'الوظائف المحفوظة',
    notifications: 'الإشعارات',
  },
};

export const t = (key: string, lang: 'en' | 'de' | 'ar' = 'en'): string => {
  const dict = translations[lang] || translations.en;
  return (dict as any)[key] || (translations.en as any)[key] || key;
};
```

---

## 4. Language Context & Dynamic Direction Control

Language selection is managed globally via React Context:

* **Context File**: `src/context/LanguageContext.tsx` (or `src/hooks/useLanguage.ts`)
* **Persistence**: Active language choice persists in `localStorage` under the key `careercraft_language`.

### Dynamic DOM Mirroring (`dir="rtl"`)
When a candidate switches the language to Arabic (`ar`), the context controller immediately updates the root HTML element attribute:

```typescript
// DOM Direction Update Logic
document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = language;
```

---

## 5. UI Language Selection Controls

Candidates can toggle the interface language directly from the top navigation bar or settings menu:

```text
Navbar (`Navbar.tsx`)
  └── Language Dropdown Menu
        ├── 🇺🇸 English (en)  -> dir="ltr"
        ├── 🇩🇪 Deutsch (de)  -> dir="ltr"
        └── 🇸🇦 العربية (ar)  -> dir="rtl"
```

---

## 6. RTL Layout Architecture & Styling Guidelines

To ensure pixel-perfect rendering in Right-to-Left mode, CareerCraft utilizes Tailwind CSS logical properties and directional utilities:

### 1. Directional Class Mirroring

| Visual Requirement | LTR Utility Class | RTL Utility Class / Logical Equivalent |
| :--- | :--- | :--- |
| **Padding Left / Right** | `pl-4` / `pr-4` | `ps-4` / `pe-4` (Padding Start / End) |
| **Margin Left / Right** | `ml-2` / `mr-2` | `ms-2` / `me-2` (Margin Start / End) |
| **Absolute Positioning** | `left-0` / `right-0` | `ltr:left-0 rtl:right-0` |
| **Border Side** | `border-l` / `border-r` | `ltr:border-l rtl:border-r` |
| **Text Alignment** | `text-left` / `text-right` | `ltr:text-left rtl:text-right` |

### 2. Chevron & Arrow Icon Rotation
Navigation arrows and expand/collapse icons automatically rotate 180 degrees in RTL mode:

```tsx
<ChevronDown className={`pointer-events-none absolute top-3.5 h-4 w-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
```

---

## 7. Route & Header Title Localization

Header breadcrumbs and navigation page titles pass through a dynamic translation mapper in `Navbar.tsx`:

```typescript
// Implementation: src/components/layout/Navbar.tsx

const routeTitleMap: Record<string, string> = {
  'Dashboard': 'dashboard',
  'CV Builder': 'cvBuilder',
  'Job Search': 'jobSearch',
  'Saved Jobs': 'savedJobs',
  'Applications': 'applications',
  'Interview Prep': 'interviewPrep',
  'AI Assistant': 'aiAssistant',
  'Settings': 'settings',
};

const tKey = routeTitleMap[title];
const translatedTitle = tKey && t[tKey] ? t[tKey] : title;
```

---

## 8. Missing Key Fallback Mechanism

If a translation key is missing from a specific dictionary (e.g., a newly added feature key present in `en` but not yet translated to `de`):

1. The lookup checks the active language dictionary (`translations[lang][key]`).
2. If undefined, it falls back to the English dictionary (`translations.en[key]`).
3. If still undefined, it returns the raw key string (`key`) to prevent rendering crashes.

---

## 9. Step-by-Step: Adding a New Language

To add support for a new language (e.g., French `fr`):

1. **Add Language Code**: Update the language type definition in `src/utils/i18n.ts`:
   ```typescript
   export type Language = 'en' | 'de' | 'ar' | 'fr';
   ```
2. **Add Dictionary Entry**: Add `fr: { ... }` inside `translations` in `src/utils/i18n.ts`.
3. **Register in Selector**: Add the new locale option to the Language Selector dropdown in `src/components/layout/Navbar.tsx` and `src/components/pages/SettingsPage.tsx`.

---

## Related Documentation

- [AI Gateway](./AI-GATEWAY.md)
- [API Reference](./API.md)
- [Deployment & DevOps](./DEPLOYMENT.md)
- [Observability & Telemetry](./OBSERVABILITY.md)
- [Performance Engineering](./PERFORMANCE.md)
