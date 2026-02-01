import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Thermometer, HeartPulse, Wind, Clock } from "lucide-react";
import type { SymptomData } from "./AnalysisSection";

interface SymptomFormProps {
  onSubmit: (data: SymptomData) => void;
}

const SymptomForm = ({ onSubmit }: SymptomFormProps) => {
  const [formData, setFormData] = useState<SymptomData>({
    fever: false,
    chestPain: false,
    wheezing: false,
    coughType: "",
    shortnessOfBreath: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const SelectButton = ({ 
    value, 
    current, 
    onChange, 
    label 
  }: { 
    value: string; 
    current: string; 
    onChange: (v: string) => void; 
    label: string 
  }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${current === value 
          ? "gradient-bg text-primary-foreground shadow-md" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
          Symptom Assessment
        </h3>
        <p className="text-muted-foreground">
          Provide additional symptoms to enhance diagnostic accuracy.
        </p>
      </div>

      {/* Checkbox symptoms */}
      <div className="grid sm:grid-cols-3 gap-4">
        <label className={`
          flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all
          ${formData.fever ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
        `}>
          <Checkbox
            checked={formData.fever}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fever: !!checked }))}
          />
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-destructive" />
            <span className="font-medium text-foreground">Fever</span>
          </div>
        </label>

        <label className={`
          flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all
          ${formData.chestPain ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
        `}>
          <Checkbox
            checked={formData.chestPain}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, chestPain: !!checked }))}
          />
          <div className="flex items-center gap-2">
            <HeartPulse className="h-4 w-4 text-warning" />
            <span className="font-medium text-foreground">Chest Pain</span>
          </div>
        </label>

        <label className={`
          flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all
          ${formData.wheezing ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
        `}>
          <Checkbox
            checked={formData.wheezing}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, wheezing: !!checked }))}
          />
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-info" />
            <span className="font-medium text-foreground">Wheezing</span>
          </div>
        </label>
      </div>

      {/* Cough type */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium flex items-center gap-2">
          Cough Type
        </Label>
        <div className="flex flex-wrap gap-2">
          <SelectButton
            value="none"
            current={formData.coughType}
            onChange={(v) => setFormData(prev => ({ ...prev, coughType: v }))}
            label="No Cough"
          />
          <SelectButton
            value="dry"
            current={formData.coughType}
            onChange={(v) => setFormData(prev => ({ ...prev, coughType: v }))}
            label="Dry Cough"
          />
          <SelectButton
            value="productive"
            current={formData.coughType}
            onChange={(v) => setFormData(prev => ({ ...prev, coughType: v }))}
            label="Productive (with mucus)"
          />
          <SelectButton
            value="barking"
            current={formData.coughType}
            onChange={(v) => setFormData(prev => ({ ...prev, coughType: v }))}
            label="Barking"
          />
        </div>
      </div>

      {/* Shortness of breath */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium">Shortness of Breath</Label>
        <div className="flex flex-wrap gap-2">
          <SelectButton
            value="none"
            current={formData.shortnessOfBreath}
            onChange={(v) => setFormData(prev => ({ ...prev, shortnessOfBreath: v }))}
            label="None"
          />
          <SelectButton
            value="mild"
            current={formData.shortnessOfBreath}
            onChange={(v) => setFormData(prev => ({ ...prev, shortnessOfBreath: v }))}
            label="Mild"
          />
          <SelectButton
            value="moderate"
            current={formData.shortnessOfBreath}
            onChange={(v) => setFormData(prev => ({ ...prev, shortnessOfBreath: v }))}
            label="Moderate"
          />
          <SelectButton
            value="severe"
            current={formData.shortnessOfBreath}
            onChange={(v) => setFormData(prev => ({ ...prev, shortnessOfBreath: v }))}
            label="Severe"
          />
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <Label className="text-foreground font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Symptom Duration
        </Label>
        <div className="flex flex-wrap gap-2">
          <SelectButton
            value="days"
            current={formData.duration}
            onChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}
            label="< 1 week"
          />
          <SelectButton
            value="weeks"
            current={formData.duration}
            onChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}
            label="1-4 weeks"
          />
          <SelectButton
            value="months"
            current={formData.duration}
            onChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}
            label="1-3 months"
          />
          <SelectButton
            value="chronic"
            current={formData.duration}
            onChange={(v) => setFormData(prev => ({ ...prev, duration: v }))}
            label="3+ months"
          />
        </div>
      </div>

      <Button type="submit" variant="hero" size="xl" className="w-full">
        Run AI Analysis
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  );
};

export default SymptomForm;
