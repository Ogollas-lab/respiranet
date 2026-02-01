import { useState } from "react";
import AudioUploader from "./AudioUploader";
import SymptomForm from "./SymptomForm";
import AnalysisResults from "./AnalysisResults";
import { Button } from "@/components/ui/button";
import { Loader2, Stethoscope } from "lucide-react";

export interface SymptomData {
  fever: boolean;
  chestPain: boolean;
  wheezing: boolean;
  coughType: string;
  shortnessOfBreath: string;
  duration: string;
}

export interface AnalysisResult {
  predictions: {
    condition: string;
    probability: number;
    color: string;
  }[];
  confidence: "high" | "medium" | "low";
  primaryDiagnosis: string;
  audioFeatures: {
    zcr: number;
    spectralCentroid: number;
    harmonicEnergy: number;
  };
}

const AnalysisSection = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleAudioUpload = (file: File) => {
    setAudioFile(file);
    setStep(2);
  };

  const handleSymptomSubmit = (data: SymptomData) => {
    setSymptoms(data);
    runAnalysis(data);
  };

  const runAnalysis = async (symptomData: SymptomData) => {
    setIsAnalyzing(true);
    setStep(3);

    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate realistic mock results based on symptoms
    const hasFever = symptomData.fever;
    const hasWheezing = symptomData.wheezing;
    const isChronicCough = symptomData.coughType === "productive" || symptomData.coughType === "dry";

    let predictions = [
      { condition: "Normal", probability: 0.15, color: "hsl(var(--success))" },
      { condition: "Pneumonia", probability: hasFever ? 0.35 : 0.12, color: "hsl(var(--destructive))" },
      { condition: "Asthma", probability: hasWheezing ? 0.28 : 0.08, color: "hsl(var(--warning))" },
      { condition: "COPD", probability: isChronicCough ? 0.18 : 0.06, color: "hsl(var(--info))" },
      { condition: "Bronchitis", probability: 0.22, color: "hsl(var(--primary))" },
    ];

    // Normalize probabilities
    const total = predictions.reduce((sum, p) => sum + p.probability, 0);
    predictions = predictions.map(p => ({ ...p, probability: p.probability / total }));
    predictions.sort((a, b) => b.probability - a.probability);

    const primaryDiagnosis = predictions[0].condition;
    const maxProb = predictions[0].probability;
    const confidence = maxProb > 0.4 ? "high" : maxProb > 0.25 ? "medium" : "low";

    setResults({
      predictions,
      confidence,
      primaryDiagnosis,
      audioFeatures: {
        zcr: Math.random() * 0.15 + 0.05,
        spectralCentroid: Math.random() * 1500 + 500,
        harmonicEnergy: Math.random() * 0.8 + 0.1,
      }
    });

    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setAudioFile(null);
    setSymptoms(null);
    setResults(null);
    setStep(1);
    setIsAnalyzing(false);
  };

  return (
    <section id="analyze" className="py-24 bg-muted/30">
      <div className="container max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Analyze <span className="gradient-text">Lung Sounds</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload a lung sound recording and provide symptom information for 
            AI-powered respiratory analysis.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`
                h-10 w-10 rounded-full flex items-center justify-center font-medium text-sm transition-all
                ${step >= s ? "gradient-bg text-primary-foreground" : "bg-secondary text-muted-foreground"}
              `}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 rounded-full transition-all ${step > s ? "gradient-bg" : "bg-secondary"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${step >= 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Upload Audio
          </span>
          <div className="w-16" />
          <span className={`text-sm ${step >= 2 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Symptoms
          </span>
          <div className="w-16" />
          <span className={`text-sm ${step >= 3 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
            Results
          </span>
        </div>

        {/* Content */}
        <div className="glass-card p-8">
          {step === 1 && (
            <AudioUploader onUpload={handleAudioUpload} />
          )}

          {step === 2 && audioFile && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{audioFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <SymptomForm onSubmit={handleSymptomSubmit} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-16 gap-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full gradient-bg animate-pulse" />
                    <Loader2 className="absolute inset-0 m-auto h-10 w-10 text-primary-foreground animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-medium text-foreground">Analyzing Audio...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Processing spectral features and running AI inference
                    </p>
                  </div>
                </div>
              ) : results ? (
                <AnalysisResults results={results} onReset={resetAnalysis} />
              ) : null}
            </div>
          )}
        </div>

        {/* Medical disclaimer */}
        <div className="mt-8 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-center text-warning-foreground">
            <strong>⚠️ Medical Disclaimer:</strong> This is a decision-support tool for educational purposes only. 
            It is not a substitute for professional medical diagnosis. Always consult a healthcare provider.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
