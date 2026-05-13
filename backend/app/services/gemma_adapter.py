import os
from typing import Dict, Any

from app.services.gemma_mock import run_mock_analysis


def analyze_image_with_gemma(image_bytes: bytes, filename: str) -> Dict[str, Any]:
    """Adapter layer for Gemma image analysis.

    Day 4 behavior:
    - mock mode: always return the existing mock analysis.
    - real mode: attempt real-model path, then safely fallback to mock when unavailable.
    """
    _ = image_bytes
    _ = filename

    gemma_mode = os.getenv("GEMMA_MODE", "mock").strip().lower()

    if gemma_mode == "mock":
        return run_mock_analysis().model_dump()

    if gemma_mode == "real":
        try:
            # TODO: Integrate Gemma Vision inference call here.
            # TODO: Add Ollama-backed multimodal inference path here.
            # TODO: Add llama.cpp local inference path here.
            raise RuntimeError("Real Gemma model integration is not configured yet.")
        except Exception:
            fallback = run_mock_analysis().model_dump()
            fallback["offline_mode"] = True
            fallback["model_note"] = "Gemma model unavailable, using safe mock fallback."
            return fallback

    # Unknown mode should behave safely like mock.
    return run_mock_analysis().model_dump()
