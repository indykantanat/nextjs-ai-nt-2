<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Quick commands

```
npm run dev          # Start dev server (predev kills leftover port 3000)
npm run build        # Production build
npm run lint         # ESLint (flat config, eslint-config-next)
```

There is **no typecheck or test script**. To typecheck manually: `npx tsc --noEmit`.

## Prisma

- Schema: `prisma/schema.prisma` — provider is MySQL (MariaDB).
- Client output: `generated/prisma` (not `node_modules/.prisma/client`). Import via `../../generated/prisma/client` from `src/lib/prisma.ts`.
- Uses **driver adapter** (`@prisma/adapter-mariadb`) — do not use the default Prisma engine.
- Config: `prisma.config.ts` loads `dotenv/config` automatically.
- After schema changes: `npx prisma generate` (no migrate command is scripted).
- `generated/prisma` is gitignored — must run `npx prisma generate` after clone.

## Architecture

- **Next.js 16** App Router with route groups:
  - `(auth)` — login/signup pages, no navbar
  - `(front)` — main app pages with navbar
- **Auth**: Better Auth (`src/lib/auth.ts` server, `src/lib/auth-client.ts` client). API route at `src/app/api/auth/[...all]/route.ts`.
- **Database**: Prisma + MariaDB via driver adapter. Singleton pattern in `src/lib/prisma.ts`.
- **UI**: shadcn/ui (radix-sera style). Components in `src/components/ui/`. Add via `npx shadcn@latest add <component>`.
- **State**: Zustand with localStorage persistence for cart (`src/lib/cart-store.ts`, key: `skill-cart`).
- **Forms**: React Hook Form + Zod validation.
- **Path alias**: `@/*` → `./src/*`.

## Conventions

- All `(front)` routes currently set `export const instant = false` to opt out of Cache Components. This is intentional during migration — do not remove without understanding the tradeoff.
- UI text is in **Thai**. Keep user-facing strings in Thai when editing existing pages.
- Fonts: Prompt (Thai sans), Playfair Display (headings), Source Code Pro (mono) — loaded via `next/font/google` in each route group layout (`--font-sans`, `--font-heading`, `--font-mono`).
- Product images are served from `public/product-image/`.
- External API: `https://api.codingthailand.com/api/*` for course data.

## Gotchas

- `npm run dev` runs `scripts/kill-port.mjs` as a predev hook to free port 3000. If you override the port with `PORT=3005`, the script respects that.
- The Dockerfile expects standalone output and copies `generated/` and `prisma/` into the runner stage. If you change the Prisma output path, update the Dockerfile too.
- Prisma `Decimal` fields must be serialized to `number` before passing to client components (see `src/app/(front)/product/page.tsx`).
- `.env` is gitignored. Use `.env.example` as the template (contains real credentials — be careful committing it).
