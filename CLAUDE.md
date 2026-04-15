# Quick Reference for AI Contributors

This document provides a concise operational guide for AI agents (e.g., Claude) working on the **andreashilgers.de** portfolio project.

For comprehensive architectural, design, and coding standards, **always refer to `AGENTS.md`**. This file serves as a quick-reference summary to ensure consistent and high-quality contributions.

---

## 🎯 Project Context

You are contributing to the personal portfolio of **Andreas Hilgers**, a **Senior Full-Stack Developer**. The codebase is intended to demonstrate senior-level engineering practices, modern web technologies, and a premium user experience.

**Primary Objective:**  
Maintain a production-grade, performant, accessible, and visually refined application that serves as a reference implementation of modern full-stack development.

---

## ⚡ Quick Summary

- **Framework:** Next.js 15+ (App Router, Server Components)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 with theme variables
- **UI Components:** Radix UI (accessibility-first primitives)
- **Internationalization:** Custom i18n using `src/dictionaries/`
- **Utilities:** `cn()` helper for class merging
- **Deployment Target:** Vercel
- **Quality Standard:** Senior Developer–level code and architecture

---

## 📁 Routing & Structure

- All routes **must** reside under the localized directory:
```

src/app/[lang]/

````
- Ensure every new page supports both **English (`en`)** and **German (`de`)**.
- Maintain clean separation of concerns across components, utilities, and styles.

---

## 🌍 Internationalization (i18n)

- **Never hardcode user-facing strings.**
- Add all translations to:
- `src/dictionaries/en.json`
- `src/dictionaries/de.json`
- Retrieve translations exclusively using:
```ts
getDictionary(lang)
````

* Ensure metadata and SEO content are also localized.

---

## 🧩 Component & Styling Guidelines

* Prefer **Server Components** by default.
* Use **Client Components** only when interactivity or browser APIs are required.
* Utilize **Radix UI** primitives to ensure accessibility.
* Style components exclusively with **Tailwind CSS v4**.
* Reference design tokens via CSS variables defined in `src/app/globals.css`.
* Use the `cn()` utility from `src/lib/utils.ts` for conditional or merged class names.
* Avoid inline styles and hardcoded color values.

---

## 🧠 TypeScript Standards

* **Strict TypeScript is mandatory.**
* Avoid the use of `any`; prefer `unknown`, generics, or well-defined interfaces.
* Define explicit types for all component props and shared data structures.
* Ensure type safety across server and client boundaries.

---

## 🎨 Design & UX Principles

* **Design Language:** Minimalist, elegant, and premium.
* **Themes:** Support Light, Dark, and the signature **Forest** theme.
* **Accessibility:** Follow **WCAG 2.1 AA** standards.
* **Animations:** Subtle and performant, using smooth `cubic-bezier` transitions.
* **Responsiveness:** Ensure optimal rendering across all device sizes.

---

## ⚡ Performance & SEO

* Prefer **Static Site Generation (SSG)** or **Incremental Static Regeneration (ISR)** where applicable.
* Minimize client-side JavaScript and unnecessary hydration.
* Use semantic HTML and proper heading hierarchy.
* Implement localized metadata via `generateMetadata`.
* Optimize images with `next/image` and fonts with `next/font`.

---

## 🔐 Security Considerations

* Keep sensitive logic on the **server side**.
* Do not expose environment variables to the client.
* Ensure the **Secure Document Vault** remains protected and server-controlled.
* Validate and sanitize all external inputs.

---

## ✅ Definition of Done

A task is considered complete when:

* The application builds successfully (`npm run build`).
* TypeScript reports **no errors** (`npx tsc --noEmit`).
* ESLint passes without warnings (`npm run lint`).
* All user-facing text is fully localized.
* Accessibility and responsiveness are verified.
* The implementation aligns with the standards defined in `AGENTS.md`.

---

## 🚫 Anti-Patterns to Avoid

* ❌ Hardcoding UI strings instead of using the i18n system.
* ❌ Using `any` or weakening type safety.
* ❌ Excessive client-side rendering.
* ❌ Hardcoded colors or styles outside the theme.
* ❌ Introducing unnecessary dependencies.
* ❌ Exposing sensitive data to the client.

---

## 📌 Key File References

| File                            | Purpose                                           |
| ------------------------------- | ------------------------------------------------- |
| `AGENTS.md`                     | Comprehensive architectural and coding guidelines |
| `src/app/globals.css`           | Global styles and theme variables                 |
| `src/lib/utils.ts`              | Contains the `cn()` utility                       |
| `src/lib/i18n.ts`               | Internationalization utilities                    |
| `src/components/navbar.tsx`     | Navigation with theme and language switching      |
| `src/app/[lang]/vault/page.tsx` | Secure document vault                             |

---

## 📝 Final Note

When in doubt, prioritize **clarity, maintainability, performance, and accessibility**. Every contribution should reinforce the portfolio as a **showcase of senior-level full-stack expertise**.

**Always consult `AGENTS.md` for detailed guidance.**

---

### ✅ Summary of Improvements
- **Clearer project context** for AI agents.
- **Concise yet comprehensive structure** suitable for quick reference.
- **Alignment with AGENTS.md** to avoid redundancy while ensuring consistency.
- **Expanded guidance** on performance, accessibility, and security.
- **Explicit Definition of Done** and **anti-patterns** to maintain quality.
- **Professional and maintainable tone**, reflecting senior engineering standards.
