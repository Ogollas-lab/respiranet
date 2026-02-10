import Header from "@/components/Header";
import ConditionCard from "@/components/ConditionCard";
import StepCard from "@/components/StepCard";
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
              <StepCard
                step={1}
                title="Provide a Lung Sound Recording"
                summary="Record lung sounds directly using your device's microphone or upload an existing audio file in formats like WAV, MP3, or M4A."
                details="For best results, use a digital stethoscope placed on the chest wall. The recording should be 5-30 seconds long with minimal background noise. Position the microphone or stethoscope on the anterior or posterior chest wall, ideally over multiple lung fields. Breathe normally and deeply during recording. Avoid talking, coughing, or moving during the capture. Supported formats include WAV (recommended for highest quality), MP3, M4A, OGG, and WebM."
              />
              <StepCard
                step={2}
                title="Answer Symptom Questions"
                summary="Answer a few simple questions about your symptoms – things like fever, chest pain, cough type, and symptom duration."
                details="The symptom questionnaire covers key clinical indicators that help the AI correlate audio patterns with specific conditions. Questions include: presence and duration of fever, type of cough (dry vs. productive), chest pain characteristics, shortness of breath severity, smoking history, and any known respiratory conditions. These factors significantly improve diagnostic accuracy by providing clinical context that audio alone cannot capture."
              />
              <StepCard
                step={3}
                title="AI Processes Your Data"
                summary="Our system extracts acoustic features from your audio and combines them with your symptom data for AI analysis."
                details="The analysis pipeline extracts multiple acoustic features including spectral centroid, spectral rolloff, zero-crossing rate, MFCCs (Mel-frequency cepstral coefficients), chroma features, and energy levels. These features capture the unique frequency signatures of different respiratory sounds – crackles, wheezes, rhonchi, and stridor each have distinct spectral patterns. The AI model then combines these acoustic signatures with your symptom profile to generate probability scores across multiple conditions."
              />
              <StepCard
                step={4}
                title="Review Your Results"
                summary="Receive a detailed analysis with probability scores for conditions like normal breathing, pneumonia, asthma, COPD, and bronchitis."
                details="Your results include: probability percentages for each screened condition, a primary diagnosis with confidence level, detailed clinical notes explaining the findings, and personalized recommendations. The report highlights which acoustic features and symptoms contributed most to the assessment. You can download your complete results as a PDF report for your records or to share with your healthcare provider."
              />
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
              <ConditionCard
                icon={CheckCircle2}
                iconBg="bg-success/10"
                iconColor="text-success"
                title="Normal Breathing"
                summary="Clear lung sounds without abnormal patterns, indicating healthy respiratory function."
                details="Normal breath sounds include vesicular sounds heard over most lung fields, bronchial sounds near the trachea, and bronchovesicular sounds in between. During auscultation, the inspiratory phase is longer than expiratory. Healthy breathing produces consistent, soft rustling sounds without crackles, wheezes, or stridor. Factors like body habitus and breathing depth can affect sound intensity."
              />
              
              <ConditionCard
                icon={HeartPulse}
                iconBg="bg-destructive/10"
                iconColor="text-destructive"
                title="Pneumonia"
                summary="Lung infection that causes inflammation and fluid buildup, often with crackling sounds."
                details="Pneumonia is an infection of the lung parenchyma caused by bacteria, viruses, or fungi. It leads to alveolar consolidation and fluid accumulation. Auscultation typically reveals fine crackles (rales), bronchial breath sounds over consolidated areas, and sometimes egophony. Symptoms include fever, productive cough, chest pain, and shortness of breath. Early detection and treatment with appropriate antibiotics or antivirals are critical."
              />
              
              <ConditionCard
                icon={Stethoscope}
                iconBg="bg-warning/10"
                iconColor="text-warning"
                title="Asthma"
                summary="Chronic condition causing airway inflammation and characteristic wheezing sounds."
                details="Asthma is a chronic inflammatory disorder of the airways characterized by episodic and reversible airflow obstruction. It causes hyperresponsiveness of the bronchial tubes leading to wheezing, chest tightness, coughing, and shortness of breath. Auscultation reveals expiratory wheezes—musical, high-pitched sounds. Triggers include allergens, exercise, cold air, and respiratory infections. Management involves inhaled corticosteroids and bronchodilators."
              />
              
              <ConditionCard
                icon={FileAudio}
                iconBg="bg-info/10"
                iconColor="text-info"
                title="COPD"
                summary="Chronic obstructive pulmonary disease affecting airflow with diminished breath sounds."
                details="COPD encompasses chronic bronchitis and emphysema, characterized by persistent airflow limitation. It is primarily caused by long-term tobacco exposure. Patients exhibit diminished breath sounds, prolonged expiration, and sometimes wheezes or coarse crackles. Spirometry shows reduced FEV1/FVC ratio. It is progressive but manageable with bronchodilators, inhaled steroids, pulmonary rehabilitation, and smoking cessation."
              />
              
              <ConditionCard
                icon={Brain}
                iconBg="bg-primary/10"
                iconColor="text-primary"
                title="Bronchitis"
                summary="Inflammation of the bronchial tubes causing coughing and mucus production."
                details="Bronchitis is inflammation of the bronchial tubes, which carry air to and from the lungs. Acute bronchitis is usually caused by viral infections and resolves within weeks. Chronic bronchitis, a form of COPD, involves a productive cough lasting at least three months in two consecutive years. Auscultation may reveal rhonchi (low-pitched continuous sounds) and scattered wheezes. Treatment focuses on symptom management and addressing underlying causes."
                className="sm:col-span-2 sm:max-w-md sm:mx-auto"
              />
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
