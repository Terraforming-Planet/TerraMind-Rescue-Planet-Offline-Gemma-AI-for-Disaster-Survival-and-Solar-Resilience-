# GEMMA Integration Plan

## Current State (Mock Mode)

The current backend uses `backend/app/services/gemma_mock.py` to return a deterministic, Gemma-style JSON payload.
This allows frontend and API integration work to proceed without requiring a local model runtime.

## Future Gemma Vision Input

Planned production flow:
1. Accept uploaded image in FastAPI `/analyze` endpoint.
2. Preprocess image for Gemma multimodal input (resize, normalize, metadata stripping).
3. Send image + strict JSON prompt to local Gemma Vision runtime.
4. Validate model output against backend response schema.
5. Return standardized JSON payload to frontend.

## Offline / Edge Mode

The target deployment mode is offline-first:
- Run inference on local/edge hardware (no cloud dependency).
- Keep prompt and schema bundled with backend release.
- Cache last-known-good model artifacts and tokenizer files locally.
- Keep emergency UX responsive even under constrained compute.

## Fallback if Model Is Unavailable

If Gemma runtime fails, times out, or is not installed:
- Backend should return mock-safe response shape with `offline_mode: true`.
- Populate `model_note` with the reason for fallback.
- Frontend should surface fallback state without breaking render.
- Log fallback events for operational debugging.
