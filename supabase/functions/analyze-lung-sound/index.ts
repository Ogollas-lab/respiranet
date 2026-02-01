import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface SymptomData {
  fever: boolean;
  chestPain: boolean;
  wheezing: boolean;
  coughType: string;
  shortnessOfBreath: string;
  duration: string;
}

interface AudioFeatures {
  zcr: number;
  spectralCentroid: number;
  harmonicEnergy: number;
  duration: number;
  fileName: string;
}

interface AnalysisRequest {
  audioFeatures: AudioFeatures;
  symptoms: SymptomData;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { audioFeatures, symptoms }: AnalysisRequest = await req.json();

    // Build the clinical reasoning prompt
    const systemPrompt = `You are an advanced AI medical assistant specialized in respiratory disease detection. You analyze lung sound audio features combined with patient symptoms to provide clinical assessments.

Your role is to:
1. Analyze the provided audio signal features (Zero Crossing Rate, Spectral Centroid, Harmonic Energy)
2. Cross-reference with patient-reported symptoms
3. Apply clinical reasoning to differentiate between respiratory conditions
4. Provide probability estimates for each condition

IMPORTANT MEDICAL DISCLAIMER: Always emphasize that this is a decision-support tool and not a medical diagnosis. Recommend consulting healthcare professionals.

You must respond with a JSON object containing:
- predictions: array of {condition, probability, reasoning} for: Normal, Pneumonia, Asthma, COPD, Bronchitis
- confidence: "high", "medium", or "low" based on how consistent the data is
- primaryDiagnosis: the most likely condition
- clinicalNotes: brief explanation of your reasoning
- recommendations: array of suggested next steps

Base your analysis on these clinical correlations:
- High ZCR (>0.1) often indicates crackles/wheezes
- Spectral centroid 500-1000Hz is normal; higher values may indicate narrowing airways
- Low harmonic energy suggests irregular breath sounds
- Fever + productive cough + high spectral centroid = pneumonia indicators
- Wheezing + episodic symptoms = asthma indicators
- Chronic productive cough + smoking history = COPD/bronchitis indicators`;

    const userMessage = `Please analyze the following lung sound data and provide a clinical assessment:

## Audio Signal Features
- Zero Crossing Rate (ZCR): ${audioFeatures.zcr.toFixed(4)}
- Spectral Centroid: ${audioFeatures.spectralCentroid.toFixed(1)} Hz
- Harmonic Energy: ${(audioFeatures.harmonicEnergy * 100).toFixed(1)}%
- Recording Duration: ${audioFeatures.duration.toFixed(1)} seconds

## Patient Reported Symptoms
- Fever: ${symptoms.fever ? "Yes" : "No"}
- Chest Pain: ${symptoms.chestPain ? "Yes" : "No"}
- Wheezing: ${symptoms.wheezing ? "Yes" : "No"}
- Cough Type: ${symptoms.coughType || "None reported"}
- Shortness of Breath: ${symptoms.shortnessOfBreath || "None reported"}
- Symptom Duration: ${symptoms.duration || "Not specified"}

Please provide your clinical assessment as a JSON object.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from AI");
    }

    // Parse the AI response - it should be JSON
    let analysisResult;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", content);
      // Fallback: create a structured response from the text
      analysisResult = {
        predictions: [
          { condition: "Normal", probability: 0.20, reasoning: "Baseline assessment" },
          { condition: "Pneumonia", probability: symptoms.fever ? 0.30 : 0.15, reasoning: "Based on fever status" },
          { condition: "Asthma", probability: symptoms.wheezing ? 0.30 : 0.10, reasoning: "Based on wheezing" },
          { condition: "COPD", probability: 0.15, reasoning: "Requires further evaluation" },
          { condition: "Bronchitis", probability: 0.20, reasoning: "Common respiratory condition" },
        ],
        confidence: "medium",
        primaryDiagnosis: symptoms.fever ? "Pneumonia" : symptoms.wheezing ? "Asthma" : "Normal",
        clinicalNotes: content,
        recommendations: [
          "Consult with a healthcare professional",
          "Consider chest X-ray if symptoms persist",
          "Monitor symptoms and seek medical attention if worsening"
        ]
      };
    }

    // Normalize probabilities
    const total = analysisResult.predictions.reduce((sum: number, p: { probability: number }) => sum + p.probability, 0);
    analysisResult.predictions = analysisResult.predictions.map((p: { condition: string; probability: number; reasoning?: string }) => ({
      ...p,
      probability: p.probability / total
    }));

    // Sort by probability
    analysisResult.predictions.sort((a: { probability: number }, b: { probability: number }) => b.probability - a.probability);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
