from typing import List

from pydantic import BaseModel


class TranslationMap(BaseModel):
    en: str
    pl: str
    uk: str


class AnalyzeResponse(BaseModel):
    risk_level: str
    hazard_type: str
    confidence: float
    analysis: str
    alerts: List[str]
    actions: List[str]
    report: str
    translations: TranslationMap
