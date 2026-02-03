# Žijeme pro Poděbrady

Webové stránky politického hnutí Žijeme pro Poděbrady.

## Technologie

- **SvelteKit** - moderní webový framework
- **Statický web** - optimalizovaný pro nasazení na AWS S3/CloudFront

## Vývoj

### Instalace závislostí

```bash
npm install
```

### Spuštění vývojového serveru

```bash
npm run dev
```

Web bude dostupný na `http://localhost:5173`

### Build pro produkci

```bash
npm run build
```

Statické soubory budou vygenerovány ve složce `build/`

### Preview produkční verze

```bash
npm run preview
```

## Deployment na AWS

Vygenerované statické soubory ze složky `build/` nahrajte do S3 bucketu a nakonfigurujte CloudFront distribuci.

URL: https://www.zijemepropodebrady.cz/

## Struktura

- `/src/routes/+page.svelte` - hlavní stránka
- `/src/lib/data/team.json` - data členů týmu
- `/static/avatars/` - avatary členů týmu
- `/src/app.css` - globální styly
