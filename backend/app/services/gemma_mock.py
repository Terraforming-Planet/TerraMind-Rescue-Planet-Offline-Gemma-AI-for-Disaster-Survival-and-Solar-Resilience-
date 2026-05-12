from app.models.schemas import AnalyzeResponse


def run_mock_analysis() -> AnalyzeResponse:
    return AnalyzeResponse(
        scene_summary="Flooded electrical street",
        danger_level="high",
        main_hazards=["flood", "electrical risk"],
        recommended_actions=["avoid water", "move uphill"],
        solar_assessment={"solar_score": 82},
    )
