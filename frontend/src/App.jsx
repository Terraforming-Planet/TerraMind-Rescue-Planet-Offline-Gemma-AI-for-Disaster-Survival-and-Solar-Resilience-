import { useMemo, useState } from 'react';
import { riskStyles, scenarioResults } from './mockData';

const ANALYZE_API_URL = 'http://localhost:8000/analyze';

const demoScenarios = [
  { key: 'low-water-level-risk', image: '/demo-images/low-water-level-risk.svg' },
  { key: 'healthy-water-balance', image: '/demo-images/healthy-water-balance.svg' },
  { key: 'blocked-drainage-overflow', image: '/demo-images/blocked-drainage-overflow.svg' },
];

const translations = {
  en: {
    title: 'TerraMind Rescue — Day 3 Backend Integration', subtitle: 'Photo upload → FastAPI backend → risk panel → alerts → report → translations.', upload: 'Upload Image', demo: 'Demo Scenario', analyze: 'Analyze', pickFirst: 'Please upload an image or select a demo scenario.', result: 'Analysis Result', hazard: 'Hazard Type', risk: 'Risk Level', confidence: 'Confidence', analysis: 'Short Analysis', alerts: 'Emergency Alerts', actions: 'Recommended Actions', report: 'Generated Rescue / Environment Report',
  },
  pl: {
    title: 'TerraMind Rescue — Integracja Backendu Dzień 3', subtitle: 'Przesłanie zdjęcia → backend FastAPI → panel ryzyka → alerty → raport → tłumaczenia.', upload: 'Prześlij obraz', demo: 'Scenariusz demo', analyze: 'Analizuj', pickFirst: 'Najpierw prześlij obraz lub wybierz scenariusz demo.', result: 'Wynik analizy', hazard: 'Typ zagrożenia', risk: 'Poziom ryzyka', confidence: 'Pewność', analysis: 'Krótka analiza', alerts: 'Alerty awaryjne', actions: 'Zalecane działania', report: 'Wygenerowany raport ratunkowo-środowiskowy',
  },
  uk: {
    title: 'TerraMind Rescue — Інтеграція Бекенду День 3', subtitle: 'Завантаження фото → FastAPI бекенд → панель ризику → сповіщення → звіт → переклади.', upload: 'Завантажити зображення', demo: 'Демо-сценарій', analyze: 'Аналізувати', pickFirst: 'Спочатку завантажте зображення або виберіть демо-сценарій.', result: 'Результат аналізу', hazard: 'Тип небезпеки', risk: 'Рівень ризику', confidence: 'Ймовірність', analysis: 'Короткий аналіз', alerts: 'Екстрені сповіщення', actions: 'Рекомендовані дії', report: 'Згенерований рятувально-екологічний звіт',
  },
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [selectedDemo, setSelectedDemo] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('');

  const t = useMemo(() => translations[language], [language]);

  const onFileChange = (event) => {
    const selected = event.target.files?.[0];
    setAnalysis(null);
    setStatus('');
    setSelectedDemo('');

    if (!selected) {
      setSelectedFile(null);
      setPreviewUrl('');
      return;
    }

    setSelectedFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const onDemoSelect = (event) => {
    const key = event.target.value;
    setSelectedDemo(key);
    setSelectedFile(null);
    setAnalysis(null);
    setStatus('');
    const scenario = demoScenarios.find((item) => item.key === key);
    setPreviewUrl(scenario ? scenario.image : '');
  };

  const onAnalyze = async () => {
    if (!previewUrl) {
      setStatus(t.pickFirst);
      return;
    }

    if (!selectedFile) {
      const mock = scenarioResults[selectedDemo] ?? scenarioResults['healthy-water-balance'];
      setAnalysis(mock);
      setStatus('Demo analysis loaded (offline mode).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(ANALYZE_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
      setStatus('Backend analysis completed.');
    } catch {
      const fallback = scenarioResults[selectedDemo] ?? scenarioResults['blocked-drainage-overflow'];
      setAnalysis(fallback);
      setStatus('Backend offline. Showing fallback mock analysis.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 backdrop-blur">
          <div className="mb-4 flex flex-wrap justify-between gap-3">
            <h1 className="text-2xl font-bold text-orange-300 md:text-3xl">{t.title}</h1>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm">
              <option value="en">English</option><option value="pl">Polski</option><option value="uk">Українська</option>
            </select>
          </div>
          <p className="text-slate-300">{t.subtitle}</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <label className="text-sm font-semibold text-slate-200">{t.upload}</label>
            <input type="file" accept="image/*" onChange={onFileChange} className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-white" />

            <label className="mt-4 block text-sm font-semibold text-slate-200">{t.demo}</label>
            <select value={selectedDemo} onChange={onDemoSelect} className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
              <option value="">Select demo scenario...</option>
              {demoScenarios.map((item) => <option key={item.key} value={item.key}>{item.key}</option>)}
            </select>

            {previewUrl && <img src={previewUrl} alt="Selected scene" className="mt-4 h-64 w-full rounded-xl border border-slate-700 object-cover" />}
            <button onClick={onAnalyze} className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-400">{t.analyze}</button>
            {status && <p className="mt-3 text-sm text-amber-300">{status}</p>}
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5">
            <h2 className="mb-4 text-xl font-semibold text-cyan-200">{t.result}</h2>
            {analysis ? (
              <div className="space-y-4 text-sm">
                <div><span className="text-slate-400">{t.hazard}: </span><span className="font-semibold">{analysis.hazard_type}</span></div>
                <div><span className="text-slate-400">{t.risk}: </span><span className={`rounded-full border px-3 py-1 font-bold ${riskStyles[analysis.risk_level]}`}>{analysis.risk_level}</span></div>
                <div><span className="text-slate-400">{t.confidence}: </span>{Math.round(analysis.confidence * 100)}%</div>
                <div><p className="text-slate-400">{t.analysis}</p><p className="mt-1 text-slate-200">{analysis.analysis}</p></div>
              </div>
            ) : <p className="text-slate-400">No results yet.</p>}
          </div>
        </section>

        {analysis && (
          <section className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-red-500/40 bg-red-950/30 p-5"><h3 className="font-semibold text-red-200">{t.alerts}</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-red-100">{analysis.alerts.map((a) => <li key={a}>{a}</li>)}</ul></article>
            <article className="rounded-2xl border border-orange-500/40 bg-orange-950/30 p-5"><h3 className="font-semibold text-orange-200">{t.actions}</h3><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-orange-100">{analysis.actions.map((a) => <li key={a}>{a}</li>)}</ol></article>
            <article className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><h3 className="font-semibold">{t.report}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{analysis.report}</p></article>
          </section>
        )}
      </div>
    </main>
  );
}
