# TerraMind Rescue Planet: Offline Gemma AI for Disaster Survival and Solar Resilience

A hackathon-ready MVP showing one complete offline-first workflow.

**Current MVP:** React + FastAPI + mock Gemma-style JSON.

**Next step:** replace mock analysis with Gemma multimodal inference.

**image upload → AI analysis → danger result → emergency instructions → JSON report**

## Project Structure

```text
frontend/   # React + Vite + Tailwind cinematic dashboard
backend/    # FastAPI API with /analyze mock Gemma endpoint
demo/       # demo scripts and scenario placeholders
docs/       # architecture and product notes
assets/     # screenshots and static media
```

## Architecture Overview

- **Frontend (mobile-first):** Dark cinematic disaster console for upload + result visualization.
- **Backend (offline-ready):** Local FastAPI service exposing JSON `/analyze` response.
- **AI layer (mock now):** `gemma_mock.py` returns structured Gemma-style inference payload.

## MVP Workflow

1. User uploads a field image in frontend dashboard.
2. Frontend triggers analysis flow (currently mock JSON from backend or demo fallback).
3. Risk level + hazards + confidence render instantly.
4. Emergency instruction panel displays prioritized actions.
5. JSON report is returned in a fixed API schema for handoff/logging.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Gemma Adapter Mode

Set `GEMMA_MODE` to control the backend adapter behavior:

- `GEMMA_MODE=mock` (default): always uses the safe local mock service.
- `GEMMA_MODE=real`: attempts real Gemma integration (placeholder for Day 4), and if unavailable it automatically falls back to mock with:
  - `offline_mode: true`
  - `model_note: "Gemma model unavailable, using safe mock fallback."`

Example:

```bash
cd backend
GEMMA_MODE=mock uvicorn app.main:app --reload
```

## API Example

### Endpoint

`POST /analyze`

### Example Response

```json
{
  "risk_level": "HIGH",
  "hazard_type": "Blocked drainage overflow",
  "confidence": 0.94,
  "analysis": "Flood and drainage overflow risk detected.",
  "alerts": ["Water overflow detected"],
  "actions": ["Inspect drainage system"],
  "report": "AI detected blocked drainage causing overflow and flood risk.",
  "translations": {"en": "Flood risk detected.", "pl": "Wykryto ryzyko powodzi.", "uk": "Виявлено ризик повені."},
  "offline_mode": true,
  "model_note": "Mock Gemma-style analysis. Real Gemma multimodal inference not yet enabled."
}
```

## Screenshot Placeholder

Add demo screenshots here:

- `assets/dashboard-mobile.png`
- `assets/analysis-results.png`

## Notes

- No auth, no database, no cloud dependency (by design).
- Built to run fully local/offline for resilience scenarios.
- Clean base structure ready for real Gemma model integration next.

## Day 4 Features

- TXT/JSON/PDF report export from frontend analysis panel.
- Offline model status endpoint: `GET /model-status`.
- Visual Risk Map Panel (offline placeholder grid card, no map SDK).
- Safe mock fallback remains active until real Gemma local model is connected.
