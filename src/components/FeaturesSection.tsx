import { 
  AudioWaveform, 
  Brain, 
  FileAudio, 
  Activity,
  Shield,
  Microscope
} from "lucide-react";

const features = [
  {
    icon: FileAudio,
    title: "Audio Preprocessing",
    description: "Band-pass filtering, noise reduction, and spectral analysis to isolate diagnostic lung sound frequencies.",
    color: "text-primary"
  },
  {
    icon: AudioWaveform,
    title: "Feature Engineering",
    description: "Mel-spectrograms, MFCCs, and chromatic features stacked as multi-channel inputs for deep learning.",
    color: "text-accent"
  },
  {
    icon: Brain,
    title: "Deep Learning Model",
    description: "MobileNetV2 CNN with transfer learning for lightweight, mobile-ready respiratory classification.",
    color: "text-info"
  },
  {
    icon: Activity,
    title: "Multi-Class Detection",
    description: "Identifies Normal, Pneumonia, Asthma, COPD, Bronchitis, and other respiratory anomalies.",
    color: "text-success"
  },
  {
    icon: Microscope,
    title: "Clinical Reasoning",
    description: "Symptom-based reasoning layer fuses audio prediction with patient symptoms for refined diagnosis.",
    color: "text-warning"
  },
  {
    icon: Shield,
    title: "Explainable Output",
    description: "Probability scores, confidence levels, and transparent uncertainty reporting for clinical trust.",
    color: "text-primary"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Hybrid AI <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Combining digital signal processing with state-of-the-art deep learning 
            for accurate, explainable respiratory disease screening.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-6 hover:glow-shadow transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
