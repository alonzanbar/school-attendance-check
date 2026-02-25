# school-attendance-check

Google Apps Script project (deployed with [clasp](https://github.com/google/clasp)).

## One-time setup (existing project)

1. Get your **Script ID**: open the project in [script.google.com](https://script.google.com) → Project settings (gear) → **Script ID**.

2. In this repo:

```bash
npm install
npm run login
npm run clone -- YOUR_SCRIPT_ID
```

If you already have local files (e.g. `Code.gs`, `Index.html`) and `clasp clone` pulled different ones, keep your versions and run `npm run push` to upload them.

## Deploy by code

```bash
npm run push           # upload Code.gs, Index.html, etc. to Apps Script
npm run deploy         # create/update web app deployment
```

## Other commands

| Command | Description |
|--------|-------------|
| `npm run open` | Open project in browser |
| `npm run pull` | Pull latest from Apps Script into local files |
| `npm run logs` | Stream execution logs |
| `npm run deploy:prod` | Deploy with "Production" description |

## Notes

- `.clasp.json` (script ID) is gitignored; each dev runs `clone` once with the Script ID.
- Change `timeZone` in `appsscript.json` if needed.
