import os
from typing import Dict, Any


def check_local_model_available() -> Dict[str, Any]:
    gemma_mode = os.getenv("GEMMA_MODE", "mock").strip().lower()
    gemma_model_path = os.getenv("GEMMA_MODEL_PATH", "").strip()

    if gemma_mode == "real" and gemma_model_path and os.path.exists(gemma_model_path):
        return {
            "available": True,
            "mode": "real",
            "note": "Local model path found.",
        }

    return {
        "available": False,
        "mode": "mock",
        "note": "Local model unavailable, safe mock fallback active.",
    }
