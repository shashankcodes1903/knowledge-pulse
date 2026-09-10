<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# KnowledgePulse Agent Guidelines

This section defines operational guidelines, conventions, and constraints for AI coding agents working on **KnowledgePulse**.

---

## 1. Core Principles & Strict Milestone Boundaries

- **Milestone 1 Scope (Completed)**: Application layer, MongoDB-backed accounts, stateless JWT authentication, protected routes, service selection, resource metadata onboarding, user profile.
- **Strict Boundary**: Do **NOT** implement AI/LLM models, chatbots, RAG pipelines, vector databases (Pinecone, Chroma, pgvector), document text extraction/OCR/chunking, or payment gateways (Stripe) until the corresponding milestone is explicitly requested.
- **Security First**: Never store unhashed passwords. Never expose secrets (`password`, `verifyCode`, `verifyCodeExpiry`, `AUTH_SECRET`) in responses, logs, or client-accessible payloads. Always use the `toSafeUser()` projection.

---

## 2. Technology Stack & Key Libraries

- **Framework**: Next.js 16 (App Router) + TypeScript.
- **Package Manager**: Strictly `pnpm`. Lockfile `pnpm-lock.yaml` must remain in sync. Never use `npm` or `yarn`.
- **Database**: MongoDB via **Mongoose**. Connection caching via `global.mongooseCache` in `src/lib/db.ts`.
- **Authentication**: Stateless JWT in HTTP-only `kp_session` cookie signed via **`jose`** (`HS256`). Password hashing with **`bcryptjs`**.
- **Form State & UI**: React Hook Form with Zod resolvers.
- **UI Components & Styling**: shadcn/ui + Base UI primitives using the **Field** pattern (`Field`, `FieldLabel`, `FieldDescription`, `FieldError`), styled with Tailwind CSS following Material Design 3 (Material You).
- **Validation**: **Zod 4**. Note: Zod 4 issues are accessed via `result.error.issues` (not `result.error.errors`).

---

## 3. Directory Layout & Architecture Conventions

```text
src/
├── actions/             # Server Actions ('use server') for auth and user mutations
├── app/
│   ├── (auth)/          # Unauthenticated routes (/login, /register, /signup)
│   ├── (protected)/     # Protected routes (/services, /onboarding/resources, /profile)
│   ├── api/             # Route Handlers (/api/auth/login, /api/auth/me, etc.)
│   ├── layout.tsx       # Root layout with Roboto font & metadata
│   └── page.tsx         # Public landing page with MD3 hero & showcase
├── components/
│   ├── auth/            # Auth forms (LoginForm, RegisterForm)
│   ├── layout/          # Navbar, AuthNav, UserAvatar
│   ├── profile/         # ProfileCard, UserAvatar
│   ├── resources/       # DocumentUploadSection, ResourceUrlSection
│   ├── services/        # ServiceCard, ServiceGrid, ServiceSelector
│   └── ui/              # shadcn & Base UI primitives (button, field, input, etc.)
├── data/
│   └── services.json    # Canonical source of truth for the 4 core services
├── lib/
│   ├── auth.ts          # getCurrentUser(), requireUser(), session cookies
│   ├── db.ts            # Mongoose connection pooling/caching
│   ├── env.ts           # Centralized environment variables
│   ├── password.ts      # bcrypt hashing and comparison
│   ├── session.ts       # jose JWT token signing and verification
│   └── validations/     # Zod validation schemas (auth, services, resources)
└── models/
    └── user.ts          # Mongoose User model and IUserDocument interface
```

---

## 4. Authentication & Protected Routes Guardrails

1. **Server-Side Verification**:
   - `getCurrentUser()` inspects the `kp_session` cookie, verifies the JWT with `AUTH_SECRET`, and fetches the user from MongoDB using `toSafeUser()`.
   - `requireUser()` calls `getCurrentUser()` and automatically issues a Next.js `redirect("/login")` if unauthenticated.
2. **Layout Enforcement**:
   - `src/app/(protected)/layout.tsx` enforces authentication via `requireUser()`.
   - Mark protected layouts with `export const dynamic = "force-dynamic";` to prevent Next.js build-time cookie evaluation errors (`DYNAMIC_SERVER_USAGE`).
3. **Server Actions vs Route Handlers**:
   - Server Actions in `src/actions/` provide high-performance RPC for Next.js forms and UI.
   - API routes in `src/app/api/auth/` offer standard HTTP endpoints (e.g. for external consumers, mobile apps, or headless tests). Both validate input with Zod schemas.

---

## 5. Design System: Material Design 3 (Material You)

- **Colors**: Tonal surface system derived from purple seed (`#6750A4`). Surface: `#FFFBFE`, Surface Container: `#F3EDF7`, Outline: `#79747E`.
- **Typography**: Roboto with weights 400, 500, 700.
- **Shapes & Buttons**: All buttons must be pill-shaped (`rounded-full`). Cards use generous radii (`rounded-2xl` or `rounded-3xl` / 24-28px).
- **Tactile Feedback**: Use `active:scale-95` on clickable elements. Use opacity state layers (`bg-md-primary/90`, `bg-md-primary/10`) instead of hard color switches.

---

## 6. Testing Conventions

- **Unit/Component Tests**: Vitest in `tests/unit/`.
  - Pure Node.js server tests (e.g., token signing, hashing): Add `// @vitest-environment node` header.
  - Browser/DOM component tests: Use default `jsdom` with Testing Library.
  - Crypto polyfill: WebCrypto is polyfilled in `tests/setup.ts` for jsdom environments.
- **E2E Tests**: Playwright in `tests/e2e/`.
  - Target browser: Chromium.
  - Base UI components: Notice that Base UI Checkbox produces both a visual `<span role="checkbox">` and a hidden `<input>`. Use `page.getByRole("checkbox", { name: ... }).click()` for deterministic interaction.
- **Pre-commit Verification**:
  - `pnpm lint` (zero warnings/errors)
  - `pnpm test` (all unit tests pass)
  - `pnpm test:e2e` (Playwright tests pass)
  - `pnpm build` (production build succeeds)

