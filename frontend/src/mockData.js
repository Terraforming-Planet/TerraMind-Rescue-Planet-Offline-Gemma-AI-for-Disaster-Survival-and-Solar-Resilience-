export const scenarioResults = {
  'low-water-level-risk': {
    hazard_type: 'Low water level risk',
    risk_level: 'LOW',
    confidence: 0.91,
    analysis:
      'Water level is below seasonal average. Immediate flood danger is low, but monitor irrigation reserves and drought stress indicators.',
    alerts: ['No immediate evacuation required.', 'Issue conservation advisory for local households.'],
    actions: [
      'Track reservoir levels every 6 hours.',
      'Start low-intensity water conservation protocol.',
      'Prepare community alerts in case rapid weather change occurs.',
    ],
    report:
      'TerraMind report: Scene indicates stable terrain with reduced standing water. Risk profile currently LOW. Continue proactive monitoring for climate volatility.',
    translations: { en: 'Low flood risk. Keep monitoring.', pl: 'Niskie ryzyko powodzi. Kontynuuj monitoring.', uk: 'Низький ризик повені. Продовжуйте моніторинг.' },
    offline_mode: true,
    model_note: 'Demo scenario mock response.'
  },
  'healthy-water-balance': {
    hazard_type: 'Healthy water balance',
    risk_level: 'MEDIUM',
    confidence: 0.88,
    analysis:
      'Hydrology appears balanced, but weather models suggest moderate rainfall. Situation is stable with medium readiness posture recommended.',
    alerts: ['Rain band approaching within 8-12 hours.', 'Prepare drainage teams on standby.'],
    actions: [
      'Perform quick inspection of local drainage points.',
      'Pre-position first response equipment near vulnerable roads.',
      'Keep public channels active with readiness updates.',
    ],
    report:
      'TerraMind report: System identifies healthy water distribution and no active overflow. Maintain MEDIUM alert due to forecast uncertainty and preserve team readiness.',
    translations: { en: 'Conditions stable with moderate watch.', pl: 'Warunki stabilne przy umiarkowanej gotowości.', uk: 'Умови стабільні, помірна готовність.' },
    offline_mode: true,
    model_note: 'Demo scenario mock response.'
  },
  'blocked-drainage-overflow': {
    hazard_type: 'Blocked drainage overflow',
    risk_level: 'CRITICAL',
    confidence: 0.97,
    analysis:
      'Severe pooling and drainage obstruction detected. Fast overflow escalation is likely with high threat to roads, homes, and power infrastructure.',
    alerts: [
      'Flash flood danger in low-lying zones.',
      'Potential electrical hazard near flooded utility lines.',
      'Immediate field response required.',
    ],
    actions: [
      'Dispatch emergency teams to unblock primary drains immediately.',
      'Shut down exposed electrical lines in affected streets.',
      'Issue urgent evacuation advisory for critical blocks.',
      'Open temporary shelter and medical triage points.',
    ],
    report:
      'TerraMind report: AI classification indicates drainage failure with active overflow pattern. Risk posture CRITICAL. Initiate rapid-response protocol and enforce zone safety controls now.',
    translations: { en: 'Critical flood risk. Immediate response required.', pl: 'Krytyczne ryzyko powodzi. Wymagana natychmiastowa reakcja.', uk: 'Критичний ризик повені. Потрібна негайна реакція.' },
    offline_mode: true,
    model_note: 'Demo scenario mock response.'
  },
};

export const riskStyles = {
  LOW: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200',
  MEDIUM: 'border-amber-400/50 bg-amber-500/15 text-amber-200',
  HIGH: 'border-orange-400/50 bg-orange-500/15 text-orange-200',
  CRITICAL: 'border-red-400/60 bg-red-500/20 text-red-200',
};
