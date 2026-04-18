import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, CheckCircle, Info, Activity, Waves, Zap, FileText, Lightbulb, Download, Loader2 } from "lucide-react";
import { generatePdfReport } from "@/lib/generatePdfReport";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResult, SymptomData } from "./AnalysisSection";

interface AnalysisResultsProps {
  results: AnalysisResult;
  symptoms?: SymptomData;
  fileName?: string;
  onReset: () => void;
}

const AnalysisResults = ({ results, symptoms, fileName, onReset }: AnalysisResultsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const confidenceConfig = {
    high: { 
      icon: CheckCircle, 
      color: "text-success", 
      bg: "bg-success/10", 
      border: "border-success/20",
      label: "High Confidence" 
    },
    medium: { 
      icon: Info, 
      color: "text-warning", 
      bg: "bg-warning/10", 
      border: "border-warning/20",
      label: "Medium Confidence" 
    },
    low: { 
      icon: AlertTriangle, 
      color: "text-destructive", 
      bg: "bg-destructive/10", 
      border: "border-destructive/20",
      label: "Low Confidence" 
    },
  };

  const conf = confidenceConfig[results.confidence];
  const ConfIcon = conf.icon;

  const handleDownloadReport = async () => {
    setIsGenerating(true);
    try {
      // Small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const pdfFileName = generatePdfReport({
        results,
        symptoms,
        fileName,
      });
      
      toast({
        title: "Report Downloaded",
        description: `${pdfFileName} has been saved to your device.`,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* AI Analysis Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-primary">Powered by Lovable AI</span>
        </div>
      </div>

      {/* Primary diagnosis */}
      <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 border border-border">
        <p className="text-sm text-muted-foreground mb-2">Primary Assessment</p>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4 break-words">
          {results.primaryDiagnosis}
        </h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${conf.bg} ${conf.border} border`}>
          <ConfIcon className={`h-4 w-4 ${conf.color}`} />
          <span className={`text-sm font-medium ${conf.color}`}>{conf.label}</span>
        </div>
      </div>

      {/* Probability chart */}
      <div className="space-y-4">
        <h4 className="font-display text-lg font-semibold text-foreground">
          Disease Probability Distribution
        </h4>
        <div className="space-y-3">
          {results.predictions.map((pred, index) => (
            <div key={pred.condition} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{pred.condition}</span>
                  {pred.reasoning && (
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      — {pred.reasoning}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {(pred.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${pred.probability * 100}%`,
                    backgroundColor: pred.color,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Notes from AI */}
      {results.clinicalNotes && (
        <div className="p-6 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h4 className="font-display text-lg font-semibold text-foreground">
              Clinical Analysis Notes
            </h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {results.clinicalNotes}
          </p>
        </div>
      )}

      {/* Recommendations */}
      {results.recommendations && results.recommendations.length > 0 && (
        <div className="p-6 rounded-xl bg-info/5 border border-info/20">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-info" />
            <h4 className="font-display text-lg font-semibold text-foreground">
              Recommendations
            </h4>
          </div>
          <ul className="space-y-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-info">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Audio features */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Zero Crossing Rate</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {results.audioFeatures.zcr.toFixed(4)}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-4 w-4 text-accent" />
            <span className="text-xs text-muted-foreground">Spectral Centroid</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {results.audioFeatures.spectralCentroid.toFixed(0)} Hz
          </p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-warning" />
            <span className="text-xs text-muted-foreground">Harmonic Energy</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">
            {(results.audioFeatures.harmonicEnergy * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Spectrogram placeholder */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
        <h4 className="font-display text-lg font-semibold text-foreground mb-4">
          Mel-Spectrogram Analysis
        </h4>
        <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/30 to-info/20 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Simulated spectrogram bars */}
          <div className="absolute inset-0 flex items-end justify-around p-2">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-primary to-accent rounded-full opacity-60"
                style={{ 
                  height: `${Math.random() * 80 + 20}%`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
          <div className="relative z-10 text-center">
            <p className="text-sm text-muted-foreground">
              Frequency analysis complete
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-muted rounded-lg border border-border">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Note:</strong> These results are generated by AI analysis of audio features 
          combined with symptom data. This is not a medical diagnosis. Please consult a 
          healthcare professional for proper evaluation and treatment.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button variant="clinical" size="lg" className="flex-1" onClick={onReset}>
          <RefreshCw className="h-5 w-5 mr-2" />
          New Analysis
        </Button>
        <Button 
          variant="hero" 
          size="lg" 
          className="flex-1" 
          onClick={handleDownloadReport}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Download className="h-5 w-5 mr-2" />
          )}
          {isGenerating ? "Generating..." : "Download Report"}
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;
