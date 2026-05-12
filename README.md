# TerraMind Rescue Planet: Offline Gemma AI for Disaster Survival and Solar Resilience

A hackathon-ready MVP showing one complete offline-first workflow:

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
2. Frontend triggers analysis flow (currently mock JSON).
3. Danger level + hazards + solar score cards render instantly.
4. Emergency instruction panel displays prioritized actions.
5. JSON report is printed for handoff/logging.

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

## API Example

### Endpoint

`POST /analyze`

### Example Response

```json
{
  "scene_summary": "Flooded electrical street",
  "danger_level": "high",
  "main_hazards": ["flood", "electrical risk"],
  "recommended_actions": ["avoid water", "move uphill"],
  "solar_assessment": {
    "solar_score": 82
  }
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
