# Local Demo Test Guide

## 1) Run backend

From the repository root:

```bash
python backend/app.py
```

Keep this terminal running so the API is available for the demo.

## 2) Run frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite (typically `http://localhost:5173`).

## 3) Upload demo image

In the web UI, use the upload control to select a disaster or environment image for analysis.

## 4) Validate demo outcomes

After upload, confirm the following areas update correctly:

- **Risk panel**: risk score/category appears and matches image context.
- **Alerts**: alert cards/list are generated with actionable items.
- **Report**: analysis report/summary text renders fully.
- **Translations**: switch language and verify translated labels/content appear.
