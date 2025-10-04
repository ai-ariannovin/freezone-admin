## FreeZone Admin – Cursor Project Checklist (Reusable)

Use this end‑to‑end checklist as a repeatable playbook for future Cursor projects (Next.js + React + TS + Tailwind + Shadcn/Radix/Headless UI).

### 1) Kickoff & Workspace
- Clone or create repo; open in Cursor.
- Verify Node/LTS, pnpm/npm versions.
- Install deps in each app/workspace:
  - `npm i` (or `pnpm i`)
- Create a run target and test:
  - `npm run dev` → open app on local port.
- Configure `.gitignore` at root to avoid nested repos.

### 2) Project Structure (recommended)
- `src/app` for Next.js routes, `src/components` for UI/feature components.
- `src/lib` for utilities (`api.ts`, `mockApi.ts`, `utils.ts`).
- `src/contexts` for global providers (`AuthContext`).
- `src/types` central TS types.
- Keep UI library atoms under `src/components/ui`.

### 3) Auth & Guarding
- Provide `AuthProvider` with:
  - `user`, `isLoading`, `login`, `logout`, `hasRole`, `hasPermission`.
- Wrap protected pages with `ProtectedRoute`:
  - `requiredPermissions` and/or `requiredRoles`.
- For local testing, use `mockApi.login` and `mockApi.getCurrentUser`.
- Align slugs for roles/permissions with your SQL seed files.

### 4) RBAC Consistency
- Map tables: `roles`, `permissions`, `permission_categories`, `permission_role`, `role_user`.
- Mirror slugs in frontend constants/mock:
  - Example permissions: `view.users`, `create.users`, `view.roles`, `edit.permissions`, `view.licenses`, `request.license`, `manage.freezones`, `link.business.freezone`.
- Keep a single source of truth (SQL → types → mock → guards).

### 5) UI/UX Standards
- RTL support where needed (`dir="rtl"`).
- Dialog headers right‑aligned, close button opposite.
- Avoid separate filter boxes; use table header tooling (search/sort/pagination) inline.
- Operations column aligned left in RTL.
- Sorting indicators: gray arrows to the right of the title.

### 6) Reusable DataTable (highly recommended)
- Centralize list behavior in `src/components/ui/data-table.tsx`:
  - Props: `columns`, `data`, `rtl`, `searchable`, `sortable`, `paginated`, pageSize options.
  - Column API: `{ key, title, sortable?, align?, render? }`.
- Migrate all lists (Users, Roles, Permissions, Categories, Licenses, Forms, Businesses) to `DataTable`.
- Keep custom cell rendering via `render` functions.

### 7) Feature Workflow (per feature)
1. Define types in `src/types` if missing.
2. Add mocks in `src/lib/mockApi.ts` (optional) for quick UI.
3. Build UI with reusable components:
   - Forms via `ui/input`, `ui/select`, `ui/form`.
   - Lists via `ui/data-table`.
4. Hook up state: CRUD (add/edit/delete) in component state first; later replace with API calls.
5. Add modals using `ui/dialog` (RTL aware).
6. Add guards in the page (route) with `ProtectedRoute`.

### 8) Sidebar & Layout
- Provide `Sidebar` (mobile + desktop) with clear boundaries:
  - Backdrop blur, subtle ring/shadow, active item highlight and indicator bar.
- `Header` receives `setSidebarOpen`.
- Main content has padding matching design (`px-4 sm:px-6 lg:px-8`).

### 9) RTL & Localization
- Apply `dir="rtl"` to tables/containers where necessary.
- Use consistent Persian labels; avoid ambiguous terms (e.g., use "سطوح دسترسی" instead of "مجوز" در حوزه RBAC).

### 10) API Integration
- `lib/api.ts` for real backend calls (axios/fetch) with interceptors.
- Replace mock calls incrementally; keep identical shapes to minimize refactors.
- Keep envs in `.env.local`.

### 11) Git & GitHub (quick path)
- Initialize at root, avoid nested git inside subfolders.
- If GitHub CLI installed:
  - `gh repo create <name> --public --source . --remote origin --push`
- Otherwise:
  - Create remote on GitHub; `git remote add origin <url>`; `git push -u origin main`.
- Commit cadence: small, focused edits; conventional commit messages.

### 12) Quality Gates
- Type check and lint:
  - `npm run lint` (fix import leftovers after refactors).
- Minimal tests where feasible (unit for utils, smoke for components).
- Manual QA script per page:
  - Load page, run through CRUD, guards (authorized/unauthorized), RTL visuals, table sort/search/pagination.

### 13) Common Gotchas
- Permission slugs mismatch → unauthorized redirects. Fix slugs or login as admin.
- Nested git repo inside app folder → remove nested `.git` and track from root.
- Dialog markup: ensure proper `Dialog`, `DialogContent`, closing tags (common JSX issue).
- DataTable migrations: remove legacy pagination/filter boxes; avoid duplicate search UIs.

### 14) Release/Deploy (outline)
- Build: `npm run build` (Next 15/Turbopack).
- Verify environment variables for API base URL.
- Deploy to Vercel or preferred platform; set `NEXT_PUBLIC_*` envs.

### 15) Minimal Page Template (guarded)
```tsx
// src/app/example/page.tsx
'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function ExamplePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <ProtectedRoute requiredPermissions={['view.example']}>
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="lg:pr-72">
          <Header setSidebarOpen={setSidebarOpen} />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{/* content */}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
```

### 16) Definition of Done (per feature)
- Types defined and used.
- UI implemented with RTL support.
- List uses `DataTable` with search/sort/pagination.
- CRUD flows working (mock or live API).
- Guards applied with correct slugs.
- Lint passes; no unused imports.
- Commit pushed; PR created if team workflow.




