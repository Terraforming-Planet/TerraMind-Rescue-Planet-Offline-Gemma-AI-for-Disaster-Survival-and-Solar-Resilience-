import { useMemo, useState } from 'react';
import { mockAnalysis } from './mockData';

const translations = {
  en: {
    badge: 'Offline Ready',
    title: 'TerraMind Disaster-Rescue AI',
    subtitle: 'Upload a scene image to receive risk analysis, alerts, and rescue instructions.',
    uploadLabel: 'Upload disaster image',
    uploadHint: 'PNG or JPG',
    analyze: 'Analyze',
    analyzing: 'Analyzing...',
    fallback: 'Backend unavailable. Showing demo response.',
    riskPanel: 'Risk Level',
    emergencyAlerts: 'Emergency Alerts',
    rescueInstructions: 'Rescue Instructions',
    rescueReport: 'Rescue Report',
    hazards: 'Detected Hazards',
    solar: 'Solar Resilience Score',
    noImage: 'Please upload an image first.',
  },
  es: {
    badge: 'Listo sin conexión',
    title: 'TerraMind IA de Rescate en Desastres',
    subtitle: 'Sube una imagen para recibir análisis de riesgo, alertas e instrucciones.',
    uploadLabel: 'Subir imagen del desastre',
    uploadHint: 'PNG o JPG',
    analyze: 'Analizar',
    analyzing: 'Analizando...',
    fallback: 'Backend no disponible. Mostrando resultado de demostración.',
    riskPanel: 'Nivel de Riesgo',
    emergencyAlerts: 'Alertas de Emergencia',
    rescueInstructions: 'Instrucciones de Rescate',
    rescueReport: 'Reporte de Rescate',
    hazards: 'Peligros Detectados',
    solar: 'Puntuación de Resiliencia Solar',
    noImage: 'Primero sube una imagen.',
  },
  fr: {
    badge: 'Prêt hors ligne',
    title: 'TerraMind IA de Secours Catastrophe',
    subtitle: 'Téléversez une image pour obtenir analyse de risque, alertes et consignes.',
    uploadLabel: 'Téléverser une image',
    uploadHint: 'PNG ou JPG',
    analyze: 'Analyser',
    analyzing: 'Analyse en cours...',
    fallback: 'Backend indisponible. Résultat de démonstration affiché.',
    riskPanel: 'Niveau de Risque',
    emergencyAlerts: 'Alertes d’Urgence',
    rescueInstructions: 'Instructions de Secours',
    rescueReport: 'Rapport de Secours',
    hazards: 'Dangers Détectés',
    solar: 'Score de Résilience Solaire',
    noImage: 'Veuillez d’abord téléverser une image.',
  },
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const t = useMemo(() => translations[language], [language]);

  const onFileChange = (event) => {
    const selected = event.target.files?.[0];
    setAnalysis(null);
    setStatus('');
    if (!selected) {
      setFile(null);
      setPreviewUrl('');
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const onAnalyze = async () => {
    if (!file) {
      setStatus(t.noImage);
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch {
      setAnalysis(mockAnalysis);
      setStatus(t.fallback);
    } finally {
      setLoading(false);
    }
  };

  const level = analysis?.danger_level?.toLowerCase() || 'unknown';
  const riskClass =
    level === 'high' ? 'bg-red-500/20 text-red-200 border-red-500/40' : level === 'medium' ? 'bg-amber-500/20 text-amber-200 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40';

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">{t.badge}</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <h1 className="text-3xl font-bold text-orange-300">{t.title}</h1>
          <p className="mt-2 text-slate-300">{t.subtitle}</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <label className="mb-2 block text-sm font-medium text-slate-200">{t.uploadLabel}</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="block w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <p className="mt-2 text-xs text-slate-400">{t.uploadHint}</p>

            {previewUrl && <img src={previewUrl} alt="preview" className="mt-4 h-56 w-full rounded-xl border border-slate-700 object-cover" />}

            <button
              onClick={onAnalyze}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t.analyzing : t.analyze}
            </button>
            {status && <p className="mt-3 text-sm text-amber-300">{status}</p>}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-3 text-lg font-semibold">{t.riskPanel}</h2>
            {analysis ? (
              <>
                <div className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold uppercase ${riskClass}`}>{analysis.danger_level}</div>
                <p className="mt-4 text-sm text-slate-200">{analysis.scene_summary}</p>
                <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm">
                  <p className="text-slate-400">{t.solar}</p>
                  <p className="text-2xl font-bold text-amber-300">{analysis.solar_assessment?.solar_score ?? 'N/A'}</p>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">No analysis yet.</p>
            )}
          </div>
        </section>

        {analysis && (
          <section className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-red-500/40 bg-red-950/20 p-5">
              <h3 className="text-base font-semibold text-red-200">{t.emergencyAlerts}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-red-100">
                {analysis.main_hazards?.map((hazard) => (
                  <li key={hazard}>{hazard}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-orange-500/40 bg-orange-950/20 p-5">
              <h3 className="text-base font-semibold text-orange-200">{t.rescueInstructions}</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-orange-100">
                {analysis.recommended_actions?.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="text-base font-semibold">{t.rescueReport}</h3>
              <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-300">
                {JSON.stringify(analysis, null, 2)}
              </pre>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
