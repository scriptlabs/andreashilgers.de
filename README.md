# andreashilgers.de - Portfolio

Modernes Portfolio-Projekt, entwickelt mit Next.js, Radix UI und TailwindCSS.

## Features
- **Next.js 15+ (App Router):** Aktuellste Web-Technologie.
- **Mehrsprachigkeit (i18n):** Unterstützt Deutsch und Englisch über `/[lang]` Pfade.
- **Theming:** Runtime Switching zwischen Light, Dark und Forest Mode.
- **UI:** Barrierefreie Komponenten von Radix UI.
- **Performance:** Optimiert für Vercel-Deployment.

## Deployment auf Vercel

Dieses Projekt ist für den direkten Import aus GitHub auf Vercel vorbereitet:

1. Gehe zu [vercel.com](https://vercel.com).
2. Klicke auf **"Add New..."** -> **"Project"**.
3. Verbinde dein GitHub-Konto und wähle das Repository `andreashilgers.de` aus.
4. Vercel erkennt automatisch das **Next.js** Framework.
5. Klicke auf **"Deploy"**.

### Umgebungsvariablen
Aktuell werden keine speziellen Umgebungsvariablen benötigt. Falls du später eine Datenbank oder API-Keys hinzufügst, kannst du diese in den Vercel Project Settings unter "Environment Variables" eintragen.

## Lokale Entwicklung

```bash
npm install
npm run dev
```
Offne [http://localhost:3000](http://localhost:3000) in deinem Browser.
