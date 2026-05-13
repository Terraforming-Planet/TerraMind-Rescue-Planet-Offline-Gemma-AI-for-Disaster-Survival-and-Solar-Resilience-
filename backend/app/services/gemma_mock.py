from app.models.schemas import AnalyzeResponse, TranslationMap


def run_mock_analysis() -> AnalyzeResponse:
    return AnalyzeResponse(
        risk_level="HIGH",
        hazard_type="Blocked drainage overflow",
        confidence=0.94,
        analysis="Flood and drainage overflow risk detected.",
        alerts=[
            "Water overflow detected",
            "Possible erosion risk",
            "Blocked water flow",
        ],
        actions=[
            "Inspect drainage system",
            "Remove blockage",
            "Monitor water level",
        ],
        report="AI detected blocked drainage causing overflow and flood risk.",
        translations=TranslationMap(
            en="Flood risk detected.",
            pl="Wykryto ryzyko powodzi.",
            uk="Виявлено ризик повені.",
        ),
    )
