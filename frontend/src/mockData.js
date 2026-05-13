export const scenarioResults = {
  'low-water-level-risk': {
    hazardType: 'Low water level risk',
    riskLevel: 'LOW',
    confidence: 0.91,
    shortAnalysis:
      'Water level is below seasonal average. Immediate flood danger is low, but monitor irrigation reserves and drought stress indicators.',
    emergencyAlerts: ['No immediate evacuation required.', 'Issue conservation advisory for local households.'],
    recommendedActions: [
      'Track reservoir levels every 6 hours.',
      'Start low-intensity water conservation protocol.',
      'Prepare community alerts in case rapid weather change occurs.',
    ],
    report:
      'TerraMind report: Scene indicates stable terrain with reduced standing water. Risk profile currently LOW. Continue proactive monitoring for climate volatility.',
  },
  'healthy-water-balance': {
    hazardType: 'Healthy water balance',
    riskLevel: 'MEDIUM',
    confidence: 0.88,
    shortAnalysis:
      'Hydrology appears balanced, but weather models suggest moderate rainfall. Situation is stable with medium readiness posture recommended.',
    emergencyAlerts: ['Rain band approaching within 8-12 hours.', 'Prepare drainage teams on standby.'],
    recommendedActions: [
      'Perform quick inspection of local drainage points.',
      'Pre-position first response equipment near vulnerable roads.',
      'Keep public channels active with readiness updates.',
    ],
    report:
      'TerraMind report: System identifies healthy water distribution and no active overflow. Maintain MEDIUM alert due to forecast uncertainty and preserve team readiness.',
  },
  'blocked-drainage-overflow': {
    hazardType: 'Blocked drainage overflow',
    riskLevel: 'CRITICAL',
    confidence: 0.97,
    shortAnalysis:
      'Severe pooling and drainage obstruction detected. Fast overflow escalation is likely with high threat to roads, homes, and power infrastructure.',
    emergencyAlerts: [
      'Flash flood danger in low-lying zones.',
      'Potential electrical hazard near flooded utility lines.',
      'Immediate field response required.',
    ],
    recommendedActions: [
      'Dispatch emergency teams to unblock primary drains immediately.',
      'Shut down exposed electrical lines in affected streets.',
      'Issue urgent evacuation advisory for critical blocks.',
      'Open temporary shelter and medical triage points.',
    ],
    report:
      'TerraMind report: AI classification indicates drainage failure with active overflow pattern. Risk posture CRITICAL. Initiate rapid-response protocol and enforce zone safety controls now.',
  },
};

export const riskStyles = {
  LOW: 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200',
  MEDIUM: 'border-amber-400/50 bg-amber-500/15 text-amber-200',
  HIGH: 'border-orange-400/50 bg-orange-500/15 text-orange-200',
  CRITICAL: 'border-red-400/60 bg-red-500/20 text-red-200',
};
