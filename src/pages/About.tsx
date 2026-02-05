import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Stethoscope, 
  Brain, 
  Shield, 
  Users, 
  HeartPulse, 
  Mic, 
  FileAudio, 
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Healthcare</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">LungAI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              LungAI is an innovative AI-powered tool designed to help analyze lung sounds 
              and provide insights into potential respiratory conditions. Our mission is to 
              make respiratory health screening more accessible to everyone.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              What Does LungAI Do?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6 text-center">
                <div className="h-14 w-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Record or Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Capture lung sounds using your device's microphone or upload existing audio recordings
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="h-14 w-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI analyzes the audio patterns combined with your symptom information
                </p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="h-14 w-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Get Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed analysis with probability scores for various respiratory conditions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-4xl">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              How Does It Work?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Provide a Lung Sound Recording</h3>
                  <p className="text-muted-foreground">
                    You can either record lung sounds directly using your device's microphone 
                    (ideally with a digital stethoscope for best results) or upload an existing 
                    audio file in formats like WAV, MP3, or M4A. The recording should be 5-30 
                    seconds long with minimal background noise.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Answer Symptom Questions</h3>
                  <p className="text-muted-foreground">
                    After uploading your audio, you'll answer a few simple questions about your 
                    symptoms – things like whether you have a fever, chest pain, cough type, and 
                    how long you've been experiencing symptoms. This helps the AI make more 
                    accurate assessments.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AI Processes Your Data</h3>
                  <p className="text-muted-foreground">
                    Our system extracts acoustic features from your audio recording – including 
                    spectral characteristics, frequency patterns, and energy levels. These features, 
                    combined with your symptom data, are analyzed by an advanced AI model trained 
                    to recognize patterns associated with different respiratory conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Review Your Results</h3>
                  <p className="text-muted-foreground">
                    You'll receive a detailed analysis showing probability scores for conditions 
                    like normal breathing, pneumonia, asthma, COPD, and bronchitis. The report 
                    includes clinical notes, recommendations, and confidence levels. You can 
                    download your results as a PDF report.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions We Screen */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="font-display text-3xl font-bold mb-8 text-center">
              Conditions We Can Help Identify
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Normal Breathing</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear lung sounds without abnormal patterns, indicating healthy respiratory function
                  </p>
                </div>
              </div>
              
              <div className="border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pneumonia</h3>
                  <p className="text-sm text-muted-foreground">
                    Lung infection that causes inflammation and fluid buildup, often with crackling sounds
                  </p>
                </div>
              </div>
              
              <div className="border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Asthma</h3>
                  <p className="text-sm text-muted-foreground">
                    Chronic condition causing airway inflammation and characteristic wheezing sounds
                  </p>
                </div>
              </div>
              
              <div className="border border-border rounded-xl p-5 flex gap-4 items-start">
                <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                  <FileAudio className="h-5 w-5 text-info" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">COPD</h3>
                  <p className="text-sm text-muted-foreground">
                    Chronic obstructive pulmonary disease affecting airflow with diminished breath sounds
                  </p>
                </div>
              </div>
              
              <div className="border border-border rounded-xl p-5 flex gap-4 items-start sm:col-span-2 sm:max-w-md sm:mx-auto">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Bronchitis</h3>
                  <p className="text-sm text-muted-foreground">
                    Inflammation of the bronchial tubes causing coughing and mucus production
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="py-16 bg-warning/5">
          <div className="container max-w-3xl">
            <div className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  Important Medical Disclaimer
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">LungAI is not a medical diagnostic tool.</strong> It is 
                    designed for educational and informational purposes only. The analysis 
                    provided by our AI system should never be used as a substitute for 
                    professional medical advice, diagnosis, or treatment.
                  </p>
                  <p>
                    Always consult with a qualified healthcare provider about any questions 
                    or concerns you may have regarding a medical condition. Never disregard 
                    professional medical advice or delay seeking it because of something 
                    you have read or received from this application.
                  </p>
                  <p>
                    If you're experiencing a medical emergency, please contact emergency 
                    services immediately or visit your nearest emergency room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <div className="h-16 w-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Your Privacy Matters
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We take your privacy seriously. Audio recordings are processed securely 
                and are not stored permanently unless you create an account to save your 
                analysis history. Your health data is encrypted and never shared with 
                third parties.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold mb-2">Secure Processing</h3>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted during transmission and processing
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">No Permanent Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Audio files are processed in real-time and not stored on our servers
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Your Data, Your Control</h3>
                <p className="text-sm text-muted-foreground">
                  Account holders can delete their analysis history at any time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Try LungAI today and get AI-powered insights into your respiratory health.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/#analyze">
                <Stethoscope className="h-5 w-5 mr-2" />
                Start Your Analysis
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
