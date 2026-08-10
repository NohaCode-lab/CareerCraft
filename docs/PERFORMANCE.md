# ⚡ CareerCraft Performance Engineering

## 1. Performance Architecture Overview

CareerCraft is engineered to achieve fast initial page loads, responsive UI transitions, and minimal bundle overhead across desktop and mobile browsers. The architecture relies on client-side code splitting, modern asset bundling, CSS utility minification, and component-level rendering controls.

```text
Vite Build Pipeline (`vite.config.ts`)
        │
        ├─► Route-Level Code Splitting (`React.lazy()`)
        ├─► Tailwind CSS v4 Utility Pruning (`@tailwindcss/vite`)
        ├─► ES Module Tree Shaking & Minification
        │
        ▼
Production Asset Chunks (`dist/assets/`)
        ├── `index-qhqiU0jp.js`       (449.68 kB Vendor Chunk)
        ├── `index-DqUoALja.css`      ( 86.54 kB Minified CSS)
        └── Route Chunks (CVBuilder, JobSearch, InterviewPrep, etc.)
```

---

## 2. Route-Level Code Splitting & Lazy Loading

To eliminate monolithic initial bundle downloads, all major application routes in the React SPA are split into dynamic chunks using `React.lazy()` and wrapped with `React.Suspense`.

```typescript
// Implementation: src/App.tsx

import React, { Suspense, lazy } from 'react';

const DashboardPage = lazy(() => import('./components/pages/DashboardPage'));
const CVBuilderPage = lazy(() => import('./components/pages/CVBuilderPage'));
const JobSearchPage = lazy(() => import('./components/pages/JobSearchPage'));
const SavedJobsPage = lazy(() => import('./components/pages/SavedJobsPage'));
const ApplicationsPage = lazy(() => import('./components/pages/ApplicationsPage'));
const InterviewPrepPage = lazy(() => import('./components/pages/InterviewPrepPage'));
const AIAssistantPage = lazy(() => import('./components/pages/AIAssistantPage'));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage'));
```

### Impact
* **Initial Loading**: The initial entry chunk contains only core UI frameworks, authentication context, and navigation layout.
* **On-Demand Fetching**: Page-specific code chunks are fetched over HTTP only when the candidate navigates to that specific route.

---

## 3. Vite Build Optimization

The production build pipeline is driven by **Vite 6** (`vite@^6.2.1`) and `@vitejs/plugin-react`.

### Configuration Details
* **Config File**: [`vite.config.ts`](file:///C:/Users/noham/.gemini/antigravity/scratch/CareerCraft/vite.config.ts)
* **Tailwind Plugin**: Uses `@tailwindcss/vite@^4.2.2` for inline CSS processing, eliminating legacy PostCSS build overhead.
* **Target Output**: Modern ES module bundles (`dist/`).

---

## 4. Observed Bundle Structure & Build Measurements

The following metrics represent **observed build measurements** captured during production compilation (`npm run build`):

```text
vite v6.4.3 building for production...
transforming...
✓ 2304 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                              1.19 kB │ gzip:   0.56 kB
dist/assets/index-DqUoALja.css              86.54 kB │ gzip:  12.96 kB
dist/assets/PageHeader-Dhfkrc3F.js           0.54 kB │ gzip:   0.32 kB
dist/assets/SavedJobsPage-CEZ7xPsB.js        0.69 kB │ gzip:   0.44 kB
dist/assets/ApplicationsPage-DVKuzQzk.js     4.05 kB │ gzip:   1.50 kB
dist/assets/SavedJobCard-Bdgr7SmU.js         4.64 kB │ gzip:   1.52 kB
dist/assets/SettingsPage-B8-OBZF1.js        14.83 kB │ gzip:   3.69 kB
dist/assets/JobSearchPage-gG_c9Myt.js       15.26 kB │ gzip:   3.77 kB
dist/assets/AIAssistantPage-D2yz_0XT.js     20.13 kB │ gzip:   6.92 kB
dist/assets/InterviewPrepPage-DxILGnHN.js   20.29 kB │ gzip:   5.03 kB
dist/assets/CVBuilderPage-DlxK7dET.js       35.47 kB │ gzip:   7.08 kB
dist/assets/index-qhqiU0jp.js              449.68 kB │ gzip: 142.30 kB
✓ built in 8.90s
```

---

## 5. Asset & Image Optimization

1. **Inline SVGs & Lucide Icons**: UI icons are imported on-demand via `lucide-react@^1.8.0`, ensuring unused icons are tree-shaken out of the production bundle.
2. **CSS Minification**: Tailwind v4 generates a single compressed CSS file (`86.54 kB`, `12.96 kB` Gzipped) covering all application utility classes.
3. **Lazy Image Loading**: Preview images and card graphics use standard HTML `loading="lazy"` attributes.

---

## 6. Rendering Strategy & State Optimization

* **React 19 Concurrent Rendering**: Takes advantage of React 19's optimized reconciliation engine.
* **Component-Scoped State**: Local filters, modal states, and form inputs are managed within individual component states (`useState`, `useMemo`) to prevent unnecessary top-level application re-renders.
* **Memoized Computations**: Heavy filtering and sorting operations (such as job matching in `JobSearchPage.tsx` and score breakdown in `InterviewPrepPage.tsx`) use `useMemo()` dependency tracking.

---

## 7. Caching Architecture

> [!IMPORTANT]
> **Implementation Status: Not Implemented**
> * **Redis Cache**: There is **no Redis or server-side cache layer** currently installed in the Fastify BFF.
> * **Service Worker / Offline PWA**: There is **no Service Worker offline cache** installed in the frontend SPA.
> * **Client Storage**: User preferences, language selection, active theme, and mock interview history persist locally in the candidate's browser via `localStorage` (`src/services/storageService.ts`).

---

## 8. Performance Classification Matrix

| Feature / Technique | Category | Implementation Source | Status |
| :--- | :--- | :--- | :---: |
| **Route Code Splitting** | Optimization | `src/App.tsx` (`React.lazy`) | **IMPLEMENTED & MEASURED** |
| **Asset Minification** | Optimization | `vite.config.ts` (Vite 6) | **IMPLEMENTED & MEASURED** |
| **Tailwind v4 Pruning** | Optimization | `@tailwindcss/vite` | **IMPLEMENTED & MEASURED** |
| **Async AI Gateway** | Gateway | `backend/src/services/ai-gateway.service.ts` | **IMPLEMENTED & MEASURED** |
| **Redis API Caching** | Cache | N/A | **NOT IMPLEMENTED** |
| **PWA Offline Cache** | Cache | N/A | **NOT IMPLEMENTED** |

---

## Related Documentation

- [AI Gateway](./AI-GATEWAY.md)
- [API Reference](./API.md)
- [Deployment & DevOps](./DEPLOYMENT.md)
- [Observability & Telemetry](./OBSERVABILITY.md)
- [Internationalization](./INTERNATIONALIZATION.md)
