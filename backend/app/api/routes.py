from fastapi import APIRouter, File, UploadFile

from app.models.schemas import AnalyzeResponse
from app.services.gemma_adapter import analyze_image_with_gemma
from app.services.local_model_test import check_local_model_available

router = APIRouter()


@router.get("/model-status")
async def model_status() -> dict:
    return check_local_model_available()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_scene(file: UploadFile = File(...)) -> AnalyzeResponse:
    image_bytes = await file.read()
    result = analyze_image_with_gemma(image_bytes=image_bytes, filename=file.filename or "unknown")
    return AnalyzeResponse(**result)
