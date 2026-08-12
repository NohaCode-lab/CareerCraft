# 🌐 CareerCraft Language Governance Policy

This document is the **Single Source of Truth for language governance** within the CareerCraft codebase. All engineering team members and AI coding agents MUST adhere to these rules when interacting with, creating, or modifying localized content, translation dictionaries, user interfaces, or internationalization (i18n) code.

---

## 1. Purpose

CareerCraft is a modern, enterprise-grade AI career platform supporting global users across multiple languages and text layout directions. To prevent locale drift, missing UI text, broken Right-to-Left (RTL) rendering, and accidental cross-language contamination, CareerCraft establishes a **deterministic, maintainable, and audited language governance system**.

This policy ensures that:
1. Every language variant remains structurally identical and synchronized with product releases.
2. Translation key parity is maintained automatically.
3. Language isolation rules prevent accidental side effects across locales.
4. AI coding agents follow clear, enforceable boundaries when working on localization.

---

## 2. Supported Languages

CareerCraft officially supports three application locales:

| Language Code | Language Name | Text Direction | Baseline Alignment | Source Dictionary |
| :---: | :--- | :---: | :---: | :--- |
| `en` | **English** | `ltr` | Left-to-Right | Primary Baseline |
| `de` | **German** | `ltr` | Left-to-Right | Fully Supported |
| `ar` | **Arabic** | `rtl` | Right-to-Left | Fully Supported (RTL) |

The language codes `en`, `de`, and `ar` are authoritative across the application. Additional language codes MUST NOT be introduced without explicit product governance approval.

---

## 3. Translation Source of Truth

The canonical source of truth for all translation dictionaries in CareerCraft is:

```text
src/utils/i18n.ts
```

### Configuration & Re-export Surface
The file [`src/config/translations.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/src/config/translations.ts) acts solely as a re-export and configuration surface for component consumption. It MUST NOT be treated as a second independent translation dictionary and MUST NOT diverge from `src/utils/i18n.ts`.

---

## 4. Language Isolation Rule

When performing work targeted at a specific locale:

> **Rule**: Modify ONLY that language's user-facing content unless synchronized changes across multiple language dictionaries are explicitly requested or technically required.

### Target Isolation Matrix

```text
English task  → English content only  (translations.en)
German task   → German content only   (translations.de)
Arabic task   → Arabic content only   (translations.ar)
```

* A German wording correction MUST NOT silently modify English or Arabic strings.
* An Arabic translation adjustment MUST NOT alter German content.
* Adding a new user-facing feature key is inherently a synchronized change across all dictionaries to maintain structural key parity.

---

## 5. Prevention of Cross-Language Content Mixing

User-facing UI strings must belong strictly to the active selected language. Accidental mixed-language sentences are strictly prohibited:

* ❌ **Prohibited**: `"Save your Lebenslauf"` (when active UI language is English).
* ❌ **Prohibited**: German UI containing untranslated Arabic sentences.
* ❌ **Prohibited**: Arabic UI containing untranslated German text.

### Technical Identifiers Exception

Technical identifiers, framework names, API terminology, library names, class names, function names, and proper product trademarks MUST remain identical and untranslated across all language variants:

```text
React
TypeScript
Vite
Fastify
Supabase
AIGatewayService
CareerCraft
API
REST
JWT
OpenTelemetry
```

Technical identifiers represent code symbols and protocol contracts; they MUST NOT be translated or modified merely for localization purposes.

---

## 6. Language Runtime Rules

Runtime language state, document direction, and persistence are managed centrally by [`src/context/LanguageContext.tsx`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/src/context/LanguageContext.tsx):

### Runtime Contract

```text
en → lang="en", dir="ltr"
de → lang="de", dir="ltr"
ar → lang="ar", dir="rtl"
```

### State Persistence
Active language state is persisted in browser storage using the authoritative key:

```text
app_language
```

This key MUST NOT be changed or renamed. Fallback language is `'en'`.

---

## 7. Translation Key Parity Invariant

To guarantee deterministic fallback and zero missing string errors, all translation dictionaries MUST maintain exact key set equality:

$$\text{keys}(\text{en}) \equiv \text{keys}(\text{de}) \equiv \text{keys}(\text{ar})$$

* Every key defined in `translations.en` MUST exist in `translations.de` and `translations.ar`.
* No language dictionary may contain missing keys.
* No language dictionary may contain unexpected extra keys.

---

## 8. Release Version Consistency

Language variants are **localized representations of the exact same CareerCraft product release**. They are NOT independent software products and MUST NOT receive independent semantic version numbers.

```text
CareerCraft Release v1.0.0
        │
        ├── English (v1.0.0 localized representation)
        ├── German  (v1.0.0 localized representation)
        └── Arabic  (v1.0.0 localized representation)
```

* ❌ **Prohibited**: Versioning German content as `v1.1` while English remains `v1.0`.
* ✅ **Required**: All supported language variants share the exact same release tag and feature scope.

---

## 9. Documentation Language Policy

Technical documentation under `docs/` is English-first to ensure clear maintainability for engineering teams and open-source contributors:

> **Rule**: Technical documentation under `docs/` remains English-first unless a dedicated localized documentation requirement explicitly exists.

The canonical technical documentation set remains in English:
```text
docs/
├── AI-GATEWAY.md
├── API.md
├── DEPLOYMENT.md
├── INTERNATIONALIZATION.md
├── LANGUAGE-POLICY.md
├── OBSERVABILITY.md
└── PERFORMANCE.md
```

Translating architecture files into variants like `AI-GATEWAY.de.md` or `API.ar.md` without product authorization is prohibited.

---

## 10. AI Coding Agent Governance

Any AI coding agent working on the CareerCraft codebase MUST follow these 15 mandatory directives:

1. **Inspect Before Modifying**: Inspect existing `src/utils/i18n.ts` and `LanguageContext.tsx` before modifying locale code.
2. **Respect Supported Languages**: Limit localized content strictly to `en`, `de`, and `ar`.
3. **Never Invent Language Codes**: Do not introduce unsupported locale codes (e.g., `fr`, `es`, `zh`).
4. **Preserve Key Parity**: Maintain exact translation key structure across all three dictionaries.
5. **Do Not Silently Modify Unrelated Languages**: Modify only target language dictionaries unless adding a synchronized key.
6. **No Language Mixing**: Never mix `en`, `de`, and `ar` content in user-facing UI elements.
7. **Preserve Technical Identifiers**: Keep framework, library, class, function, and API names untranslated.
8. **Respect RTL/LTR Rules**: Ensure Arabic renders with `dir="rtl"` and English/German render with `dir="ltr"`.
9. **Do Not Create Duplicate Sources**: Keep `src/utils/i18n.ts` as the single translation source; do not create duplicate dictionary files.
10. **Do Not Bypass Translation System**: Use `t(key)` rather than hardcoding raw strings in components.
11. **Preserve Persistence Key**: Retain `app_language` as the `localStorage` key.
12. **Single Versioning**: Treat language variants as localized representations of a single product release version.
13. **Run Validator After Changes**: Always run `npm run i18n:check` after updating translation dictionaries.
14. **Do Not Claim Complete Localization**: Passing the structural validator does not prove full linguistic localization.
15. **Report Localization Risks**: Explicitly report hardcoded UI strings or localization risks rather than ignoring them.

---

## 11. Validation Limitations

> **Important**: Passing automated i18n validation (`npm run i18n:check`) does NOT prove that the application UI is fully localized.

The automated validator establishes **structural integrity**:
* Dictionary file existence (`en`, `de`, `ar`)
* Exact key set equality across dictionaries
* Supported language code correctness
* Layout direction mapping correctness

The validator CANNOT determine:
* Translation quality or linguistic elegance
* Grammar or spelling accuracy
* Semantic correctness in context
* Visual layout fit and text wrapping
* Un-extracted hardcoded JSX strings in components
* Visual RTL mirror perfection across all screen resolutions

---

## 12. Future Localization Remediation

Remediating hardcoded JSX strings is a separate follow-up phase. Future localization work must follow this controlled pipeline:

```text
Identify hardcoded UI strings
        ↓
Classify eligible user-facing strings
        ↓
Move strings into src/utils/i18n.ts
        ↓
Maintain key parity across en, de, ar
        ↓
Validate English UI rendering
        ↓
Validate German UI rendering
        ↓
Validate Arabic UI rendering
        ↓
Validate RTL layout & visual alignment
```

Hardcoded UI strings MUST NOT be refactored during Phase F governance implementation.
