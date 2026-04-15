# Andreas Hilgers | Senior Full-Stack Developer Portfolio

A high-performance, accessible, and visually stunning portfolio website built with the latest web technologies. This project serves as both a personal showcase and a reference for modern full-stack development patterns.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fscriptlabs%2Fandreashilgers.de)

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router, Server Components)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Just-in-Time, CSS-native variables)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (Primitives for accessibility)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [Next Themes](https://github.com/pacocoursey/next-themes) (Light, Dark, and Forest modes)
- **Internationalization:** Custom i18n implementation for high SEO performance.

## ✨ Key Features

- **Multi-language Support (i18n):** Seamless English and German integration with static generation.
- **Secure Document Vault:** A password-protected area for sensitive documents (resume, certificates).
- **Responsive & Accessible:** Fully optimized for mobile and follows WCAG accessibility standards.
- **Premium Aesthetics:** Glassmorphism effects, smooth animations, and high-quality typography.
- **Code Preview:** Showcases technical skills through integrated code snippets.

## 📂 Architecture

```text
src/
├── app/               # Next.js 15 App Router (Localized routes)
│   └── [lang]/        # Language-specific pages
├── components/        # Reusable UI components
├── dictionaries/      # i18n JSON files (DE/EN)
├── lib/               # Shared utilities and helper functions
└── styles/            # Global CSS and Tailwind configuration
```

## 🛠️ Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/scriptlabs/andreashilgers.de.git
cd andreashilgers.de
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000/de](http://localhost:3000/de) to view the project in your browser.

## 🚢 Deployment

The project is optimized for **Vercel**. Simply connect your GitHub repository for automatic CI/CD.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.
