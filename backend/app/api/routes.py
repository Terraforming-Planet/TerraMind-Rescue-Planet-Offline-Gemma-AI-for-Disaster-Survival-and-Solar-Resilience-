from fastapi import APIRouter, File, UploadFile

from app.models.schemas import AnalyzeResponse
from app.services.gemma_mock import run_mock_analysis

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_scene(file: UploadFile = File(...)) -> AnalyzeResponse:
    _ = file.filename
    return run_mock_analysis()
