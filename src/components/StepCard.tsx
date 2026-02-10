import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  summary: string;
  details: string;
}

const StepCard = ({ step, title, summary, details }: StepCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
        {step}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground">{summary}</p>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            expanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
          )}
        >
          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
            {details}
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
        >
          {expanded ? "Show less" : "Read more"}
          <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", expanded && "rotate-180")} />
        </button>
      </div>
    </div>
  );
};

export default StepCard;
