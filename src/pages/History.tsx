import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { 
  Activity, 
  Calendar, 
  Trash2, 
  FileAudio, 
  TrendingUp,
  ArrowLeft,
  Stethoscope
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisRecord {
  id: string;
  file_name: string;
  primary_diagnosis: string;
  confidence: string;
  predictions: { condition: string; probability: number }[];
  audio_features: { zcr: number; spectralCentroid: number; harmonicEnergy: number };
  symptoms: Record<string, unknown>;
  clinical_notes: string | null;
  recommendations: string[] | null;
  created_at: string;
}

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Route protection is handled by ProtectedRoute wrapper

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("analysis_history")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Map the data to our interface
      const mappedRecords: AnalysisRecord[] = (data || []).map((record) => ({
        id: record.id,
        file_name: record.file_name,
        primary_diagnosis: record.primary_diagnosis,
        confidence: record.confidence,
        predictions: record.predictions as unknown as { condition: string; probability: number }[],
        audio_features: record.audio_features as unknown as { zcr: number; spectralCentroid: number; harmonicEnergy: number },
        symptoms: record.symptoms as Record<string, unknown>,
        clinical_notes: record.clinical_notes,
        recommendations: record.recommendations as unknown as string[] | null,
        created_at: record.created_at,
      }));
      setRecords(mappedRecords);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast({
        title: "Error",
        description: "Failed to load analysis history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from("analysis_history")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setRecords(records.filter((r) => r.id !== id));
      toast({
        title: "Deleted",
        description: "Analysis record removed.",
      });
    } catch (error) {
      console.error("Error deleting record:", error);
      toast({
        title: "Error",
        description: "Failed to delete record.",
        variant: "destructive",
      });
    }
  };

  const getConfidenceBadgeVariant = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "default";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-5xl py-12 sm:py-16 lg:py-24">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Analysis <span className="gradient-text">History</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track your respiratory health over time
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : records.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Stethoscope className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Analysis Records</h3>
              <p className="text-muted-foreground mb-6">
                Start by analyzing a lung sound recording
              </p>
              <Button onClick={() => navigate("/#analyze")} className="gradient-bg">
                Analyze Now
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Summary stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileAudio className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{records.length}</p>
                      <p className="text-sm text-muted-foreground">Total Analyses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {records.filter((r) => r.primary_diagnosis === "Normal").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Normal Results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {records.filter((r) => r.confidence === "high").length}
                      </p>
                      <p className="text-sm text-muted-foreground">High Confidence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Records list */}
            {records.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base sm:text-lg truncate">{record.primary_diagnosis}</CardTitle>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{format(new Date(record.created_at), "PPp")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-shrink-0">
                      <Badge variant={getConfidenceBadgeVariant(record.confidence)}>
                        {record.confidence} confidence
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRecord(record.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">File</p>
                      <p className="font-medium truncate">{record.file_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Top Prediction</p>
                      <p className="font-medium">
                        {record.predictions[0]?.condition} (
                        {(record.predictions[0]?.probability * 100).toFixed(0)}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ZCR</p>
                      <p className="font-medium">{record.audio_features.zcr.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Spectral Centroid</p>
                      <p className="font-medium">
                        {record.audio_features.spectralCentroid.toFixed(0)} Hz
                      </p>
                    </div>
                  </div>
                  {record.clinical_notes && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">{record.clinical_notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default History;
