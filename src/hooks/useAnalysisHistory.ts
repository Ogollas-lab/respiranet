import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, SymptomData } from "@/components/AnalysisSection";
import { Json } from "@/integrations/supabase/types";

interface SaveAnalysisParams {
  fileName: string;
  results: AnalysisResult;
  symptoms: SymptomData;
}

export const useAnalysisHistory = () => {
  const saveAnalysis = async ({ fileName, results, symptoms }: SaveAnalysisParams) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: new Error("User not authenticated") };
    }

    const { error } = await supabase.from("analysis_history").insert({
      user_id: user.id,
      file_name: fileName,
      primary_diagnosis: results.primaryDiagnosis,
      confidence: results.confidence,
      predictions: results.predictions as unknown as Json,
      audio_features: results.audioFeatures as unknown as Json,
      symptoms: symptoms as unknown as Json,
      clinical_notes: results.clinicalNotes || null,
      recommendations: results.recommendations as unknown as Json || null,
    });

    return { error };
  };

  return { saveAnalysis };
};
