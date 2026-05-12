export default function EmergencyPanel({ actions }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-4">
      <h3 className="text-lg font-semibold text-red-300">Emergency Instructions</h3>
      <ol className="mt-3 space-y-2 text-sm text-slate-100">
        {actions.map((action) => (
          <li key={action} className="rounded-lg bg-slate-900/50 p-2">
            {action}
          </li>
        ))}
      </ol>
    </div>
  );
}
