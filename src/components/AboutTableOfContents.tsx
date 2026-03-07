import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Mic,
  Settings2,
  Stethoscope,
  AlertTriangle,
  Shield,
} from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "what-we-do", label: "What We Do", icon: Mic },
  { id: "how-it-works", label: "How It Works", icon: Settings2 },
  { id: "conditions", label: "Conditions", icon: Stethoscope },
  { id: "disclaimer", label: "Disclaimer", icon: AlertTriangle },
  { id: "privacy", label: "Privacy", icon: Shield },
];

const AboutTableOfContents = () => {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to top
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-6 z-40 w-48">
      <div className="rounded-xl border border-border bg-background/80 backdrop-blur-md p-3 shadow-lg">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
          On this page
        </p>
        <ul className="space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200",
                  activeId === id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AboutTableOfContents;
