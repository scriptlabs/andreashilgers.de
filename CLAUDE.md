# Claude Instructions for andreashilgers.de

Refer to **`AGENTS.md`** for full architectural and coding guidelines.

## Quick Summary
- **Stack:** Next.js 15+ (App Router), Tailwind CSS v4, i18n, Radix UI.
- **Rules:** 
  - Use `src/app/[lang]/` for all routes.
  - No hardcoded strings (use `src/dictionaries/`).
  - Use `cn()` from `src/lib/utils.ts` for dynamic classes.
  - Strict TypeScript only.
  - Maintain "Senior Developer" quality.
