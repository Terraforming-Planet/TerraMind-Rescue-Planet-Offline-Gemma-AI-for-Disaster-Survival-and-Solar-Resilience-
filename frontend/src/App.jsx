import { useState } from 'react';
import UploadPanel from './components/UploadPanel';
import ResultCards from './components/ResultCards';
import EmergencyPanel from './components/EmergencyPanel';
import { mockAnalysis } from './mockData';

export default function App() {
  const [analysis, setAnalysis] = useState(null);

  const runMockAnalysis = () => {
    setAnalysis(mockAnalysis);
  };

  return (
    <main className="min-h-screen bg-cinematic px-4 py-6">
      <div className="mx-auto max-w-md space-y-4">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-ember">Offline Rescue AI</p>
          <h1 className="mt-1 text-2xl font-bold">TerraMind // Disaster Triage Console</h1>
        </header>

        <UploadPanel onAnalyze={runMockAnalysis} />

        {analysis && (
          <>
            <ResultCards analysis={analysis} />
            <EmergencyPanel actions={analysis.recommended_actions} />
            <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-black/50 p-3 text-xs text-slate-300">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </>
        )}
      </div>
    </main>
  );
}
