# Project Context: andreashilgers.de

This repository contains the personal portfolio of **Andreas Hilgers**, a **Senior Full-Stack Developer**. The project serves as both a professional showcase and a reference implementation of modern full-stack development practices. Every contribution should reflect senior-level engineering standards, technical excellence, and a premium user experience.

---

## 🎯 Project Objectives

- **Professional Representation:** Showcase Andreas Hilgers’ technical expertise and professional brand.
- **Reference Architecture:** Demonstrate best practices in modern web development using Next.js.
- **Performance & SEO:** Deliver a fast, accessible, and search-engine-optimized application.
- **Scalability & Maintainability:** Ensure the codebase is modular, clean, and easy to extend.
- **Premium User Experience:** Provide a visually refined and accessible interface.

---

## 🏗️ Architecture & Conventions

### Framework: Next.js 16 (App Router)

- **Localized Routing:**  
  All routes must reside within:
```

src/app/[lang]/

```
Supported languages:
- `en` – English
- `de` – German

- **Server Components:**  
- Prefer **Server Components** by default for improved performance and SEO.
- Use `"use client"` only when browser APIs or interactivity are required.
- Keep sensitive logic on the server whenever possible.

- **Metadata & SEO:**  
- Use the `generateMetadata` API for all pages.
- Ensure metadata is localized for each language.
- Favor **Static Site Generation (SSG)** or **Incremental Static Regeneration (ISR)** where applicable.
- In Next.js 16, `params` and `searchParams` are asynchronous and must be awaited.
- **Middleware Convention:** Next.js 16 uses `src/proxy.ts` (with an exported `proxy` function) instead of `middleware.ts`. Never rename `proxy.ts` to `middleware.ts`.

---

### 🌍 Internationalization (i18n)

The project uses a custom dictionary-based i18n approach.

- **Translation Files:**
```

src/dictionaries/en.json
src/dictionaries/de.json

```

- **Helper Function:**
```

src/lib/get-dictionary.ts

```

- **Guidelines:**
- Never hardcode user-facing strings.
- Add all new translations to both language files.
- Ensure metadata and accessibility labels are also localized.
- Maintain SEO-friendly localized routes (e.g., `/en`, `/de`).

---

### 🎨 Styling & Theming

#### Tailwind CSS v4

- Use **Tailwind CSS v4** exclusively.
- Avoid deprecated utilities from earlier versions.
- All colors and design tokens must reference **CSS variables** defined in:
```

src/app/globals.css

```
- Prefer utility-first styling and avoid unnecessary custom CSS.

#### Themes

- Supported themes: `light`, `dark`, and the signature `forest`.
- Ensure all components maintain **sufficient contrast** and readability across themes.
- Use **Next Themes** for theme management.

#### Class Merging

- Use the `cn()` utility from:
```

src/lib/utils.ts

```
to safely merge conditional Tailwind classes.

---

### 🧩 Components & UI

- **Radix UI:**  
Utilize Radix UI primitives for accessible and composable UI interactions (dialogs, dropdowns, tooltips, etc.).

- **Icons:**  
Use **Lucide React** as the standard icon library for visual consistency.

- **Component Design Principles:**
- Favor small, reusable, and composable components.
- Maintain a clear separation of concerns.
- Prefer Server Components unless interactivity is required.
- Ensure consistent spacing, typography, and layout.

---

## 🛠️ Developer Guidelines

### Code Quality

- Write **clean, modular, and maintainable** TypeScript code.
- Enable and respect **strict TypeScript** settings.
- Avoid the use of `any`; prefer `unknown`, generics, or well-defined interfaces.
- Use meaningful naming conventions and clear file organization.
- Keep components focused on a single responsibility.

### Accessibility (a11y)

- Adhere to **WCAG 2.1 AA** standards.
- Ensure all interactive elements are **keyboard accessible**.
- Provide appropriate **ARIA attributes** and semantic HTML.
- Include descriptive **alt text** for all images.
- Maintain sufficient color contrast across all themes.

### Performance

- Optimize images using `next/image`.
- Optimize fonts using `next/font`.
- Minimize client-side JavaScript and unnecessary hydration.
- Leverage streaming and suspense where beneficial.
- Ensure excellent **Core Web Vitals** (LCP, CLS, INP).

### SEO

- Use semantic HTML and a proper heading hierarchy.
- Implement localized metadata via `generateMetadata`.
- Consider structured data (JSON-LD) where appropriate.

### Tone & Design Language

- The website should convey a **professional, modern, and high-end** aesthetic.
- Animations should be **subtle and performant**.
- Use **glassmorphism effects** sparingly to enhance visual depth without compromising readability.

---

## 🔐 Secure Document Vault

- **Route:**
```

/[lang]/vault

```
- **Purpose:**  
Provides a password-protected area for accessing sensitive career-related documents such as resumes and certificates.

- **Current Implementation:**  
- Utilizes a **demo client-side access code (`4242`)**.
- Intended for demonstration purposes only.

- **Future Considerations:**  
- Migrate authentication logic to a **server-side** implementation.
- Protect sensitive resources using environment variables or secure storage.
- Avoid exposing confidential data in the client bundle.

---

## 📁 Key File Map

| Path | Description |
|------|-------------|
| `src/app/[lang]/` | Localized routes and pages |
| `src/app/globals.css` | Global styles and theme variables |
| `src/components/` | Reusable UI components |
| `src/lib/get-dictionary.ts` | i18n helper for loading translations |
| `src/lib/utils.ts` | Shared utilities including `cn()` |
| `src/dictionaries/` | Translation files (`en.json`, `de.json`) |
| `src/app/[lang]/vault/page.tsx` | Secure document vault page |

---

## ✅ Definition of Done

A task is considered complete when:

- The application builds successfully (`npm run build`).
- TypeScript reports **no errors** (`npx tsc --noEmit`).
- ESLint passes without warnings (`npm run lint`).
- All user-facing text is fully localized.
- Accessibility and responsiveness are verified.
- The implementation aligns with the standards defined in `AGENTS.md` and `CLAUDE.md`.

---

## 🚫 Anti-Patterns to Avoid

- ❌ Hardcoding UI strings instead of using the i18n system.
- ❌ Using `any` or weakening type safety.
- ❌ Excessive client-side rendering.
- ❌ Hardcoded colors outside the theme variables.
- ❌ Introducing unnecessary or unmaintained dependencies.
- ❌ Exposing sensitive information to the client.

---

## 📌 Final Note

Every contribution should strengthen the portfolio as a **showcase of senior-level full-stack expertise**. Prioritize **clarity, maintainability, performance, accessibility, and consistency** in all development decisions.

For detailed architectural and coding standards, refer to **`AGENTS.md`**, and for a concise operational summary, consult **`CLAUDE.md`**.

---

### ✅ Key Enhancements

* **Improved clarity and structure** for AI agents.
* **Alignment with AGENTS.md and CLAUDE.md** to ensure consistency.
* **Expanded security and SEO guidance**.
* **Clear Definition of Done and anti-patterns**.
* **Professional and maintainable tone** reflecting senior engineering standards.