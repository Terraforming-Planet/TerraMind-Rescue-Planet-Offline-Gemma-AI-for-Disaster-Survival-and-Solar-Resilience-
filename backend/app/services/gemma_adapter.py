from typing import Dict, Any

from app.services.gemma_mock import run_mock_analysis
from app.services.local_model_test import check_local_model_available


def analyze_image_with_gemma(image_bytes: bytes, filename: str) -> Dict[str, Any]:
    """Adapter layer for Gemma image analysis.

    Day 4 behavior:
    - mock mode: always return the existing mock analysis.
    - real mode: attempt real-model path, then safely fallback to mock when unavailable.
    """
    _ = image_bytes
    _ = filename

    model_status = check_local_model_available()
    result = run_mock_analysis().model_dump()

    # Day 4 MVP: always use safe mock analysis content until real inference is integrated.
    result["offline_mode"] = not model_status["available"]
    result["model_note"] = model_status["note"]
    return result
