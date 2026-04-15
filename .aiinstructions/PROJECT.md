# Project Context: andreashilgers.de

This is the portfolio of **Andreas Hilgers**, a Senior Full-Stack Developer. It represents his professional brand and technical expertise.

## 🏗️ Architecture & Conventions

### Framework: Next.js 15+ (App Router)
- **Routes:** All pages are located within `src/app/[lang]/`.
- **Server Components:** Prefer Server Components by default. Use `use client` only when necessary for interactivity.
- **i18n:** Implemented using a custom middleware/dictionary approach.
  - Dictionaries: `src/dictionaries/de.json` and `en.json`.
  - Helper: `src/lib/get-dictionary.ts`.

### Styling: Tailwind CSS v4 & Next Themes
- **CSS Variables:** All colors must use CSS variables defined in `src/app/globals.css`.
- **Themes:** Supports `light`, `dark`, and `forest`.
- **Class Merging:** Use the `cn()` utility from `src/lib/utils.ts` for dynamic class names.

### Components
- **Radix UI:** Use Radix primitives for all UI interactions (dropdowns, dialogs, etc.).
- **Lucide Icons:** Standard icon library for the project.

## 🛠️ Developer Guidelines

- **Senior Level Code:** Write clean, modular, and well-typed TypeScript code.
- **Accessibility (a11y):** Ensure all components are keyboard accessible and have proper ARIA labels.
- **Performance:** Optimize images and avoid large client-side bundles.
- **Tone:** The website is professional, modern, and high-end.

## 🔑 Secure Vault
- **Route:** `/[lang]/vault`
- **Purpose:** A password-protected area for career-related documents (Resume, Certificates).
- **Implementation:** Currently uses a demo client-side code (`4242`).
