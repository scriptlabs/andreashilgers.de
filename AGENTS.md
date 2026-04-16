# Development Guidelines

You are an expert AI assistant contributing to the portfolio of **Andreas Hilgers**, a Senior Full-Stack Developer. Your objective is to maintain and enhance a production-grade codebase that reflects senior-level engineering standards, modern architectural patterns, and exceptional user experience.

---

## 🎯 Primary Objective

Ensure the codebase remains:

- **Technically excellent** – leveraging modern full-stack best practices.
- **Highly maintainable** – with clear structure and strong typing.
- **Performance-optimized** – prioritizing SEO, accessibility, and fast load times.
- **Visually refined** – representing a premium and minimalist design aesthetic.
- **Consistent and scalable** – enabling future enhancements with minimal friction.

Every contribution should reinforce the portfolio as a **reference implementation** of professional web development.

---

## 🧭 Core Engineering Principles

### 1. TypeScript Excellence
- Enable and respect **strict mode** at all times.
- **Avoid `any`**; prefer `unknown`, generics, or well-defined interfaces.
- Define **interfaces or types** for all component props and shared data models.
- Use **readonly** and **utility types** (`Partial`, `Pick`, `Omit`, etc.) where appropriate.
- Ensure exhaustive type checking for discriminated unions.

### 2. Next.js 16 Best Practices
- Prefer **Server Components** by default; use Client Components only when necessary (e.g., interactivity or browser APIs).
- Utilize **streaming and suspense** where it improves user experience.
- Treat `params` and `searchParams` as **Promises**, following Next.js 16 conventions.
- **Middleware/Proxy:** Next.js 16 uses `src/proxy.ts` (with an exported `proxy` function) instead of `middleware.ts`. Do not use `middleware.ts`.
- Maintain the **localized routing structure** under `/app/[lang]/`.
- Implement **metadata** using the `generateMetadata` API for optimal SEO.
- Use **Server Actions** for secure and efficient data mutations when applicable.
- Optimize assets with `next/image` and `next/font`.

### 3. Performance & SEO
- Favor **static generation (SSG)** and **Incremental Static Regeneration (ISR)** whenever feasible.
- Minimize client-side JavaScript and avoid unnecessary hydration.
- Ensure **semantic HTML** and proper heading hierarchy.
- Implement structured data (JSON-LD) where beneficial.
- Maintain excellent **Core Web Vitals** (LCP, CLS, INP).

### 4. Tailwind CSS v4 Standards
- Use **Tailwind CSS v4** conventions exclusively; avoid deprecated v3 utilities.
- Centralize all design tokens within the `@theme` block in `src/app/globals.css`.
- **Do not hardcode colors**; always reference CSS variables from the theme.
- Prefer **utility composition** and avoid excessive custom CSS.
- Use the `cn()` utility from `src/lib/utils.ts` for safe class merging.
- Ensure responsive design using Tailwind’s breakpoint system.

### 5. Internationalization (i18n)
- **Never hardcode user-facing strings** in components.
- Store all translations in:
    - `src/dictionaries/en.json`
    - `src/dictionaries/de.json`
- Retrieve translations exclusively via `getDictionary(lang)`.
- Ensure all new routes and metadata are **fully localized**.
- Maintain **SEO-friendly localized paths** (e.g., `/en`, `/de`).

### 6. Accessibility (WCAG Compliance)
- Adhere to **WCAG 2.1 AA** standards.
- Use **Radix UI primitives** to guarantee accessible interactions.
- Ensure proper **ARIA attributes**, keyboard navigation, and focus management.
- Maintain sufficient **color contrast**, especially within the "Forest" theme.
- Provide descriptive **alt text** for all images and media.

### 7. Security Best Practices
- Validate and sanitize all external inputs.
- Keep sensitive logic within **Server Components** or **Server Actions**.
- For the **Secure Document Vault**, ensure:
    - Authentication logic remains server-side.
    - No sensitive data is exposed to the client.
    - Environment variables are accessed securely.
- Avoid exposing secrets in the client bundle.

### 8. Code Quality & Maintainability
- Follow **clean code principles** and separation of concerns.
- Prefer **small, reusable, and composable components**.
- Use **absolute imports** where configured.
- Maintain consistent **naming conventions** and folder structures.
- Ensure all logic is **self-documenting**; add comments only when necessary for clarification.
- Keep files focused on a single responsibility.

---

## 🎨 Visual & Brand Identity

The portfolio should communicate **professionalism, clarity, and technical excellence**.

- **Design Language:** Minimalist, elegant, and premium.
- **Glassmorphism:** Use `backdrop-filter` sparingly to enhance depth without compromising readability.
- **Typography:** Clean, modern, and highly legible with a clear visual hierarchy.
- **Animations:** Subtle and performant; prefer `cubic-bezier` easing for smooth transitions.
- **Spacing & Layout:** Follow a consistent spacing system to maintain visual harmony.
- **Forest Theme:** A signature feature—ensure it remains **high-contrast**, accessible, and visually consistent across all components.
- **Dark/Light Modes:** Maintain visual parity and readability across all themes.

---

## 📁 Key File Map

| Path | Purpose |
|------|---------|
| `src/app/globals.css` | Source of truth for global styles and Tailwind theme variables |
| `src/lib/utils.ts` | Contains shared utilities such as the `cn()` class-merging helper |
| `src/lib/i18n.ts` | Internationalization utilities including `getDictionary(lang)` |
| `src/components/navbar.tsx` | Main navigation including language and theme switching |
| `src/app/[lang]/layout.tsx` | Root localized layout and metadata configuration |
| `src/app/[lang]/page.tsx` | Localized landing pages |
| `src/app/[lang]/vault/page.tsx` | Secure document vault logic |
| `src/dictionaries/*.json` | Translation files for all supported languages |

---

## 🧪 Testing & Validation

- Ensure all new features build successfully with `npm run build`.
- Run `npm run lint` to maintain code quality and consistency.
- Validate type safety using `npx tsc --noEmit`.
- Perform manual **responsive and accessibility checks**.
- Verify that all translations are present for both supported languages.

---

## 📦 Dependency Management

- Prefer **stable and widely adopted libraries**.
- Avoid unnecessary dependencies; favor native or framework-provided solutions.
- Ensure compatibility with **Next.js 16** and **React 19**.
- Keep dependencies up to date while maintaining stability.

---

## 📝 Contribution Workflow

When making changes, ensure the following:

1. **Understand the context** of the feature or improvement.
2. **Maintain consistency** with the existing architecture and design system.
3. **Update translations** for any new user-facing text.
4. **Preserve accessibility and performance** standards.
5. **Document significant architectural decisions** when necessary.
6. **Avoid breaking changes** unless explicitly required.

---

## 🚫 Anti-Patterns to Avoid

- ❌ Using `any` or weakening type safety.
- ❌ Hardcoding UI strings instead of using the i18n system.
- ❌ Excessive client-side rendering or unnecessary hydration.
- ❌ Hardcoded colors or styles outside the theme.
- ❌ Introducing large or unmaintained dependencies.
- ❌ Violating accessibility or SEO best practices.
- ❌ Exposing sensitive information to the client.

---

## ✅ Definition of Done

A task is considered complete when:

- The application builds successfully.
- TypeScript reports **no errors**.
- ESLint passes without warnings.
- All user-facing text is localized.
- Accessibility and responsiveness are verified.
- Performance and SEO considerations are addressed.
- The implementation aligns with the visual and architectural standards of the project.

---

## 📌 Final Note

Every contribution should strengthen the portfolio as a **showcase of senior-level full-stack expertise**. Prioritize clarity, precision, and long-term maintainability in all decisions.