function DangerBadge({ level }) {
  const tone = level === 'high' ? 'bg-danger/20 text-red-300 border-danger/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${tone}`}>{level}</span>;
}

export default function ResultCards({ analysis }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-slate-400">Danger Level</h3>
          <DangerBadge level={analysis.danger_level} />
        </div>
        <p className="mt-3 text-sm text-slate-200">{analysis.scene_summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h3 className="text-sm text-slate-400">Solar Resilience</h3>
          <p className="mt-2 text-3xl font-bold text-amber-300">{analysis.solar_assessment.solar_score}</p>
          <p className="text-xs text-slate-400">Score / 100</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h3 className="text-sm text-slate-400">Hazards</h3>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {analysis.main_hazards.map((hazard) => (
              <li key={hazard}>• {hazard}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
