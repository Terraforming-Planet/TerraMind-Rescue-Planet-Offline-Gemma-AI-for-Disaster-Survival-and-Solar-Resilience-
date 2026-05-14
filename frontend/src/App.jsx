import { useMemo, useRef, useState } from 'react';
import { riskStyles, scenarioResults } from './mockData';

const ANALYZE_API_URL = 'http://localhost:8000/analyze';

const demoScenarios = [
  { key: 'low-water-level-risk', image: '/demo-images/low-water-level-risk.svg' },
  { key: 'healthy-water-balance', image: '/demo-images/healthy-water-balance.svg' },
  { key: 'blocked-drainage-overflow', image: '/demo-images/blocked-drainage-overflow.svg' },
];

const translations = {
  en: {
    title: 'TerraMind Rescue — Day 4 Reports + Risk Map + Offline Model Status', subtitle: 'Photo upload → FastAPI backend → risk panel → map panel → exportable rescue report.', upload: 'Upload Image', demo: 'Demo Scenario', analyze: 'Analyze', pickFirst: 'Please upload an image or select a demo scenario.', result: 'Analysis Result', hazard: 'Hazard Type', risk: 'Risk Level', confidence: 'Confidence', analysis: 'Short Analysis', alerts: 'Emergency Alerts', actions: 'Recommended Actions', report: 'Generated Rescue / Environment Report',
  }
};

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [selectedDemo, setSelectedDemo] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('');
  const reportRef = useRef(null);

  const t = useMemo(() => translations[language], [language]);

  const riskDirection = useMemo(() => {
    const dir = {
      LOW: 'Maintain current zone. Move toward higher visibility routes if conditions shift.',
      MEDIUM: 'Move east to elevated road access points and monitor drainage updates.',
      HIGH: 'Move north-east toward known dry corridor and avoid low-lying streets.',
      CRITICAL: 'Immediate westbound evacuation toward nearest marked shelter zone.',
    };
    return analysis ? dir[analysis.risk_level] : 'Awaiting analysis.';
  }, [analysis]);

  const onFileChange = (event) => {
    const selected = event.target.files?.[0];
    setAnalysis(null); setStatus(''); setSelectedDemo('');
    if (!selected) { setSelectedFile(null); setPreviewUrl(''); return; }
    setSelectedFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const onDemoSelect = (event) => {
    const key = event.target.value;
    setSelectedDemo(key); setSelectedFile(null); setAnalysis(null); setStatus('');
    const scenario = demoScenarios.find((item) => item.key === key);
    setPreviewUrl(scenario ? scenario.image : '');
  };

  const onAnalyze = async () => {
    if (!previewUrl) { setStatus(t.pickFirst); return; }
    if (!selectedFile) {
      const mock = scenarioResults[selectedDemo] ?? scenarioResults['healthy-water-balance'];
      setAnalysis(mock); setStatus('Demo analysis loaded (offline mode).'); return;
    }
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch(ANALYZE_API_URL, { method: 'POST', body: formData });
      if (!response.ok) throw new Error(`Backend error: ${response.status}`);
      const data = await response.json();
      setAnalysis(data); setStatus('Backend analysis completed.');
    } catch {
      const fallback = scenarioResults[selectedDemo] ?? scenarioResults['blocked-drainage-overflow'];
      setAnalysis(fallback); setStatus('Backend offline. Showing fallback mock analysis.');
    }
  };

  const buildReportText = () => {
    if (!analysis) return '';
    return [
      `risk_level: ${analysis.risk_level}`,
      `hazard_type: ${analysis.hazard_type}`,
      `confidence: ${analysis.confidence}`,
      `analysis: ${analysis.analysis}`,
      `alerts: ${analysis.alerts.join(' | ')}`,
      `actions: ${analysis.actions.join(' | ')}`,
      `translations: ${JSON.stringify(analysis.translations)}`,
      `offline_mode: ${analysis.offline_mode}`,
      `model_note: ${analysis.model_note}`,
    ].join('\n');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 backdrop-blur">
          <div className="mb-4 flex flex-wrap justify-between gap-3">
            <h1 className="text-2xl font-bold text-orange-300 md:text-3xl">{t.title}</h1>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"><option value="en">English</option></select>
          </div>
          <p className="text-slate-300">{t.subtitle}</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <label className="text-sm font-semibold text-slate-200">{t.upload}</label>
            <input type="file" accept="image/*" onChange={onFileChange} className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-white" />
            <label className="mt-4 block text-sm font-semibold text-slate-200">{t.demo}</label>
            <select value={selectedDemo} onChange={onDemoSelect} className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
              <option value="">Select demo scenario...</option>{demoScenarios.map((item) => <option key={item.key} value={item.key}>{item.key}</option>)}
            </select>
            {previewUrl && <img src={previewUrl} alt="Selected scene" className="mt-4 h-64 w-full rounded-xl border border-slate-700 object-cover" />}
            <button onClick={onAnalyze} className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-400">{t.analyze}</button>
            {status && <p className="mt-3 text-sm text-amber-300">{status}</p>}
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-xl font-semibold text-cyan-200">{t.result}</h2>
            {analysis ? <div className="space-y-4 text-sm"><div><span className="text-slate-400">{t.hazard}: </span><span className="font-semibold">{analysis.hazard_type}</span></div><div><span className="text-slate-400">{t.risk}: </span><span className={`rounded-full border px-3 py-1 font-bold ${riskStyles[analysis.risk_level]}`}>{analysis.risk_level}</span></div><div><span className="text-slate-400">{t.confidence}: </span>{Math.round(analysis.confidence * 100)}%</div><div><p className="text-slate-400">{t.analysis}</p><p className="mt-1 text-slate-200">{analysis.analysis}</p></div></div> : <p className="text-slate-400">No results yet.</p>}
          </div>
        </section>

        {analysis && <section className="rounded-2xl border border-cyan-700/40 bg-slate-950/80 p-5"><h3 className="mb-3 font-semibold text-cyan-200">Risk Map Panel</h3><div className="rounded-xl border border-slate-700 bg-[linear-gradient(90deg,#0f172a_1px,transparent_1px),linear-gradient(#0f172a_1px,transparent_1px)] bg-[size:24px_24px] p-4 text-sm"><div className="mb-2 flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /><span>Status: Offline map scan mode</span></div><p>Risk zone: {analysis.hazard_type}</p><p>GPS: Offline location mode</p><p>Estimated area risk: <strong>{analysis.risk_level}</strong></p><p>Recommended safe direction: {riskDirection}</p></div></section>}

        {analysis && (
          <>
            <section className="grid gap-6 md:grid-cols-3"><article className="rounded-2xl border border-red-500/40 bg-red-950/30 p-5"><h3 className="font-semibold text-red-200">{t.alerts}</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-red-100">{analysis.alerts.map((a) => <li key={a}>{a}</li>)}</ul></article><article className="rounded-2xl border border-orange-500/40 bg-orange-950/30 p-5"><h3 className="font-semibold text-orange-200">{t.actions}</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-orange-100">{analysis.actions.map((a) => <li key={a}>{a}</li>)}</ol></article><article className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><h3 className="font-semibold">{t.report}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{analysis.report}</p></article></section>
            <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 print:hidden"><h3 className="font-semibold text-slate-100">Export Report</h3><div className="mt-3 flex flex-wrap gap-3"><button onClick={() => downloadFile('terramind-report.txt', buildReportText(), 'text/plain')} className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold">Download TXT Report</button><button onClick={() => downloadFile('terramind-report.json', JSON.stringify(analysis, null, 2), 'application/json')} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold">Download JSON Report</button><button onClick={() => window.print()} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold">Print / Save as PDF</button></div></section>
            <section ref={reportRef} className="rounded-2xl border border-slate-700 bg-white p-6 text-black print:block"><h2 className="mb-3 text-xl font-bold">TerraMind Printable Report</h2><ul className="space-y-2 text-sm"><li><strong>risk_level:</strong> {analysis.risk_level}</li><li><strong>hazard_type:</strong> {analysis.hazard_type}</li><li><strong>confidence:</strong> {analysis.confidence}</li><li><strong>analysis:</strong> {analysis.analysis}</li><li><strong>alerts:</strong> {analysis.alerts.join(' | ')}</li><li><strong>actions:</strong> {analysis.actions.join(' | ')}</li><li><strong>translations:</strong> {JSON.stringify(analysis.translations)}</li><li><strong>offline_mode:</strong> {String(analysis.offline_mode)}</li><li><strong>model_note:</strong> {analysis.model_note}</li></ul></section>
          </>
        )}
      </div>
    </main>
  );
}
