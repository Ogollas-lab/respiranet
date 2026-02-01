import { ArrowRight, Shield, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaveformVisualizer from "./WaveformVisualizer";

const HeroSection = () => {
  const scrollToAnalyze = () => {
    document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] hero-gradient overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-success/5 blur-2xl" />
      </div>

      <div className="container relative pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 border border-primary/10">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-secondary-foreground">
                AI-Powered Diagnostics
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Advanced{" "}
              <span className="gradient-text">Lung Sound</span>{" "}
              Analysis
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Harness the power of hybrid deep learning and digital signal processing 
              to detect respiratory conditions with clinical-grade accuracy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={scrollToAnalyze}>
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="clinical" size="xl">
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-success" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-warning" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-primary" />
                <span>Deep Learning AI</span>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative lg:pl-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative glass-card p-8 glow-shadow">
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              </div>
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Live Audio Analysis</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-muted-foreground">Processing</span>
                  </div>
                </div>

                <WaveformVisualizer />

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-display font-bold text-foreground">98%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-display font-bold text-foreground">&lt;2s</div>
                    <div className="text-xs text-muted-foreground">Analysis</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-display font-bold text-foreground">5+</div>
                    <div className="text-xs text-muted-foreground">Conditions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass-card px-4 py-2 animate-float">
              <span className="text-sm font-medium text-foreground">MobileNetV2</span>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card px-4 py-2 animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-sm font-medium text-foreground">Mel-Spectrogram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
