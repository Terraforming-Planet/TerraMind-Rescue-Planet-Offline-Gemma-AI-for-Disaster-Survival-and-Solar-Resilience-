from typing import List

from pydantic import BaseModel, Field


class AnalyzeResponse(BaseModel):
    scene_summary: str
    danger_level: str
    main_hazards: List[str]
    recommended_actions: List[str]
    solar_assessment: dict = Field(default_factory=dict)
