# Offline Model Test (Day 4)

## Run in mock mode

```bash
cd backend
GEMMA_MODE=mock uvicorn app.main:app --reload
```

This forces safe mock inference behavior.

## Enable real mode check

```bash
cd backend
export GEMMA_MODE=real
export GEMMA_MODEL_PATH=/absolute/path/to/local/gemma/model
uvicorn app.main:app --reload
```

If `GEMMA_MODE=real` and `GEMMA_MODEL_PATH` exists on disk, `/model-status` reports model availability.

## Test `/model-status`

```bash
curl http://localhost:8000/model-status
```

Expected behavior:
- If model path exists in real mode:
  - `available: true`
  - `mode: "real"`
  - `note: "Local model path found."`
- Otherwise:
  - `available: false`
  - `mode: "mock"`
  - `note: "Local model unavailable, safe mock fallback active."`

## MVP fallback note

Current TerraMind MVP safely falls back to mock mode until real Gemma multimodal inference is connected.
