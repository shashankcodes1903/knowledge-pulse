# KnowledgePulse

A Next.js application foundation built with a modern, test-first workflow and a clear separation between development and production.

The project is intentionally kept small at the foundation level. The goal is to make future features easy to build, test, review, and deploy without turning the codebase into a collection of unnecessary tools.

## Contents
* Stack
* Project structure
* Getting started
  - Prerequisites
  - Install dependencies
  - Environment
  - Start development
* Useful commands
* How the application is built
  - Forms
* Testing strategy
  - Unit/component tests
  - End-to-end tests
* Development vs production
  - Development
  - Production
* Environment variables
* CI workflow
* Docker
* Recommended development workflow
* Points to consider
  - Keep the stack small
  - Keep validation centralized
  - Keep client and server boundaries explicit
  - Test behavior, not implementation details
  - Avoid premature infrastructure
  - Keep CI aligned with local development
* Current status
* Before adding a new feature

## Stack

- **Next.js 16** — App Router + TypeScript
- **MongoDB + Mongoose** — database persistence with connection caching
- **jose** — stateless JWT token signing and verification for session cookies
- **bcryptjs** — secure password hashing
- **Tailwind CSS** — styling adhering to Material Design 3 (Material You)
- **shadcn/ui** — UI components, using the current Field-based form approach
- **Base UI** — accessible component primitives
- **React Hook Form** — client form state management
- **Zod 4** — schema validation and inferred types
- **Vitest + Testing Library** — unit and component testing
- **Playwright** — end-to-end browser user journey tests
- **GitHub Actions** — continuous integration pipeline
- **Docker** — multi-stage production container with standalone output
- **pnpm** — fast, reproducible package manager

## Project structure

```text
knowledge-pulse/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── actions/                # Server Actions ('use server') for auth & user mutations
│   │   ├── auth.ts             # registerUser, loginUser, logoutUser
│   │   └── user.ts             # saveSelectedServices, addResourceUrlAction, addDocumentMetadataAction
│   ├── app/                    # Next.js App Router routes and layouts
│   │   ├── (auth)/             # Unauthenticated routes (/login, /register, /signup)
│   │   ├── (protected)/        # Protected routes (/services, /onboarding/resources, /profile)
│   │   │   └── layout.tsx      # Enforces authentication with requireUser()
│   │   ├── api/auth/           # JSON API route handlers (/login, /register, /logout, /me)
│   │   ├── layout.tsx          # Root layout with Roboto font & metadata
│   │   └── page.tsx            # Public landing page with MD3 hero & service overview
│   ├── components/
│   │   ├── auth/               # Auth form components
│   │   ├── layout/             # Navigation (Navbar, AuthNav)
│   │   ├── profile/            # ProfileCard, UserAvatar
│   │   ├── resources/          # DocumentUploadSection, ResourceUrlSection, ResourceOnboardingView
│   │   ├── services/           # ServiceCard, ServiceGrid, ServiceFeatureList, ServiceSelector
│   │   └── ui/                 # shadcn & Base UI primitives (button, field, input, etc.)
│   ├── data/
│   │   └── services.json       # Canonical catalog of the 4 core services
│   ├── lib/
│   │   ├── auth.ts             # Centralized auth guards (getCurrentUser, requireUser, sessions)
│   │   ├── db.ts               # Mongoose connection caching utility
│   │   ├── env.ts              # Centralized environment access
│   │   ├── password.ts         # bcrypt hashing and comparison
│   │   ├── session.ts          # jose JWT token signing and verification
│   │   └── validations/        # Zod schemas (auth, services, resources)
│   └── models/
│       └── user.ts             # Mongoose User model with toSafeUser() projection
├── tests/
│   ├── setup.ts                # Test setup and WebCrypto polyfills
│   ├── unit/                   # Vitest unit/validation/component tests
│   └── e2e/                    # Playwright end-to-end browser user journeys
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── next.config.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
└── vitest.config.mts
```

## Getting started

### Prerequisites

Install:

- Node.js 24 LTS (or the version pinned by the project configuration)
- pnpm
- Docker Desktop, if you want to build/run the production container

Check your tools:

```powershell
node -v
pnpm -v
docker --version
docker compose version
```

### Install dependencies

```powershell
pnpm install
```

### Environment

Copy the example environment file into a local environment file:

```powershell
Copy-Item .env.example .env.local
```

`.env.local` is for local development and must not be committed.

At the moment the project only needs basic application configuration. More secrets can be added later as features such as authentication or a database are introduced.

### Start development

```powershell
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Useful commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start the Next.js development server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit/component tests once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:e2e:ui` | Open Playwright UI mode |
| `pnpm build` | Create a production Next.js build |
| `pnpm start` | Run the production build locally |
| `pnpm docker:build` | Build the production Docker image |
| `pnpm docker:run` | Run the production Docker image |

## How the application is built

The project follows a layered approach:

```text
UI
 ↓
shadcn/ui + Base UI
 ↓
React Hook Form
 ↓
Zod schema
 ↓
server/API logic
 ↓
data/services
```

The exact lower layers will grow as features are added. Validation should remain explicit at trust boundaries.

### Forms

Use this pattern for forms:

```text
Zod schema
    ↓
React Hook Form
    ↓
Controller
    ↓
shadcn Field
    ↓
Input / Select / Checkbox / ...
```

Validation rules belong in `src/lib/validations/` rather than being duplicated across components.

Client-side validation improves UX, but it is **not** a security boundary. Untrusted data must also be validated on the server.

## Testing strategy

There are two test layers.

### Unit/component tests

Use **Vitest + Testing Library** for fast tests around:

- components
- validation logic
- utility functions
- small isolated behaviors

These live under:

```text
tests/unit/
```

### End-to-end tests

Use **Playwright** for browser-level flows that verify the application as a user would experience it.

These live under:

```text
tests/e2e/
```

Vitest is configured to include only `tests/unit/**`, so it will not try to execute Playwright tests.

## Development vs production

Development and production are intentionally different environments.

### Development

```text
pnpm dev
    ↓
Next.js development server
    ↓
.env.local
```

Use this for daily development, hot reload, debugging, and rapid iteration.

### Production

```text
pnpm build
    ↓
Next.js production build
    ↓
pnpm start
```

The production Docker image uses the same production build path.

Next.js is configured with:

```ts
output: "standalone"
```

This produces a self-contained runtime under `.next/standalone`, allowing the final Docker image to contain only what is needed to run the application.

## Environment variables

Use:

```text
.env.example          committed template
.env.local            local development, ignored
.env.production.local local production testing, ignored
```

Required variables:

- `MONGODB_URI`: MongoDB connection string (e.g. `mongodb://127.0.0.1:27017/knowledge-pulse`).
- `AUTH_SECRET`: Secret key (minimum 32 chars) for signing session JWT tokens.

General rule:

- `NEXT_PUBLIC_*` values are allowed in browser code and must be safe to expose.
- Secrets such as database credentials, auth secrets, API keys, and private tokens must remain server-side.
- Never commit real credentials.

The project exposes application environment values through `src/lib/env.ts` so environment access stays centralized.

## CI workflow

Every push and pull request runs GitHub Actions.

The current pipeline is:

```text
push / pull request
        ↓
pnpm install --frozen-lockfile
        ↓
lint
        ↓
unit tests
        ↓
Playwright E2E
        ↓
production build
```

The CI job uses a fixed Node/pnpm toolchain and the committed `pnpm-lock.yaml` so dependency installation is reproducible.

## Docker

The project uses a multi-stage production Docker build:

```text
base
 ↓
dependencies
 ↓
builder
 ↓
runner
```

The final runtime image:

- does not contain the full development toolchain
- uses Next.js standalone output
- runs as the unprivileged `nextjs` user
- exposes port `3000`

Build it with:

```powershell
docker build -t knowledge-pulse:local .
```

Run it with:

```powershell
docker run --rm -p 3000:3000 knowledge-pulse:local
```

Then visit `http://localhost:3000`.

## Recommended development workflow

Use this loop for feature work:

```text
1. Understand the requirement
        ↓
2. Plan the change
        ↓
3. Implement the smallest useful slice
        ↓
4. Add/update tests
        ↓
5. Run lint + unit tests
        ↓
6. Run E2E when the user flow changes
        ↓
7. Run a production build for significant changes
        ↓
8. Review the diff
        ↓
9. Commit a focused change
        ↓
10. Push and let CI verify it again
```

For larger features, prefer small checkpoints instead of one very large change.

## Points to consider

### Keep the stack small

Do not add a new library just because it is popular. First check whether Next.js, TypeScript, shadcn/ui, React Hook Form, Zod, or the existing tooling already solves the problem.

### Keep validation centralized

Create reusable Zod schemas instead of duplicating rules across components, API handlers, and services.

### Keep client and server boundaries explicit

Do not put server secrets in client components or expose them through `NEXT_PUBLIC_*` variables.

### Test behavior, not implementation details

Prefer tests such as:

```text
"submitting an invalid email shows an error"
```

over tests that depend on internal component structure.

### Avoid premature infrastructure

Add tools such as Docker Compose, databases, Redis, background workers, or extra browser projects when the application actually needs them.

### Keep CI aligned with local development

A command that passes locally should ideally be reproducible in CI using the same package manager and lockfile.

## Full-stack application layer

The application includes a fully functional full-stack onboarding and account layer:

- **MongoDB & Mongoose**: Centralized cached connection utility (`src/lib/db.ts`) with a robust Mongoose `User` model (`src/models/user.ts`) supporting normalized emails, bcrypt password hashing, selected services, document metadata, resource URLs, and subscription status.
- **Authentication & Protected Routes**: Stateless JWT session cookie (`kp_session`) signed via `jose`, stored in secure HTTP-only cookies. Centralized server-side helpers (`getCurrentUser()`, `requireUser()`) enforce authentication across layouts (`src/app/(protected)/layout.tsx`) and Server Actions (`src/actions/auth.ts`, `src/actions/user.ts`).
- **Data-Driven Services**: Four core services configured via `src/data/services.json` (`docs-mismatch`, `chatbot`, `chatbot-insights`, `chatbot-insights-suggestions`). Interactive multi-selection grid persisted to MongoDB with server-side ID validation.
- **Resource Onboarding**: Document upload metadata capture and web URL resource linking (`src/app/(protected)/onboarding/resources/page.tsx`).
- **Account Profile**: Overview page displaying account status, active services, connected knowledge sources, and sign-out action (`src/app/(protected)/profile/page.tsx`). Sensitive fields (passwords, verification codes) are never exposed.

## Current status

The application layer and account onboarding foundation are fully implemented, verified with comprehensive Vitest unit/component tests and Playwright E2E browser tests.

AI model execution (RAG retrieval, vector databases, LLM inference, document chunking, and retention prediction) is intentionally decoupled and reserved for future service-specific milestones.

## Before adding a new feature

Read [`CONTEXT.md`](./CONTEXT.md) first. It contains the project conventions, implementation decisions, and guardrails that should be followed by developers and AI coding agents.
