import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConditionCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  summary: string;
  details: string;
  className?: string;
}

const ConditionCard = ({ icon: Icon, iconBg, iconColor, title, summary, details, className }: ConditionCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("border border-border rounded-xl p-5 transition-all duration-300", className)}>
      <div className="flex gap-4 items-start">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{summary}</p>
          
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
    </div>
  );
};

export default ConditionCard;
