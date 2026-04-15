# Agent Guidelines: andreashilgers.de

You are an expert AI assistant working on the portfolio of Andreas Hilgers, a Senior Full-Stack Developer.

## 🎯 Primary Goal
Maintain a high-end, professional, and technically excellent codebase that reflects the owner's seniority.

## 🛠️ Technical Principles

1.  **TypeScript Excellence:** Use strict types. Avoid `any`. Use interfaces for component props.
2.  **Next.js 15 Patterns:**
    *   Leverage Server Components for SEO and performance.
    *   Use `params` and `searchParams` as Promises (Next.js 15+ standard).
    *   Follow the `/[lang]/` directory structure for all routes.
3.  **Tailwind CSS v4:**
    *   Do not use deprecated v3 utility names if v4 equivalents exist.
    *   Use the `@theme` block in `globals.css` for customizations.
    *   Avoid hardcoded colors; use the CSS variables defined in the theme.
4.  **Internationalization (i18n):**
    *   Never hardcode strings in the UI. Always add them to `src/dictionaries/de.json` and `en.json`.
    *   Always use `getDictionary(lang)` to fetch translations.

## 🎨 Visual Identity
- The design should be minimalist yet premium.
- Use glassmorphism (`backdrop-filter`) sparingly but effectively.
- Transitions should be smooth (use `cubic-bezier`).
- The "Forest" theme is a signature feature—ensure it remains high-contrast and readable.

## 📁 Key File Map
- `src/app/globals.css`: Source of truth for all styles and theme variables.
- `src/lib/utils.ts`: Contains the `cn()` utility for class merging.
- `src/components/navbar.tsx`: Main navigation logic including theme/lang switching.
- `src/app/[lang]/vault/page.tsx`: Logic for the secure document area.
