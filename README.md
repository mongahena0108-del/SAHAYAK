# SAHAYAK

SAHAYAK is a local-first government-scheme discovery demo for students and entrepreneurs. It uses clearly labelled demonstration records and a deterministic matching engine. It does not make external API calls.

## Run on Windows PowerShell

```powershell
cd "C:\Users\Khushi Monga\Documents\SAHAYAK"
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Verify

```powershell
npm test
npm run build
```

## Demo mode and future integration

`TINYFISH_ENABLED=false` is the default. The browser calls only the local server route, while `server/tinyfish.mjs` owns the TinyFish request. Scheme records live in `src/data/schemes.js`; matching and EMI logic are in `src/lib/matching.js`.

All displayed records are labelled illustrative sample data. Users should verify current eligibility, dates, amounts, lender terms, and application processes on official sources.
