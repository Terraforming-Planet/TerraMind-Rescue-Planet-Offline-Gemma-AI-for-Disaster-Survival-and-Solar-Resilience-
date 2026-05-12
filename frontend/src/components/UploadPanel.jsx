export default function UploadPanel({ onAnalyze }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-glow">
      <h2 className="text-lg font-semibold text-ember">Mission Input</h2>
      <p className="mt-1 text-sm text-slate-400">Upload disaster scene image for offline Gemma-assisted triage.</p>
      <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center hover:border-ember">
        <span className="text-sm text-slate-300">Tap to select image</span>
        <input className="hidden" type="file" accept="image/*" />
      </label>
      <button
        onClick={onAnalyze}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-ember to-danger px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Analyze Scene
      </button>
    </div>
  );
}
