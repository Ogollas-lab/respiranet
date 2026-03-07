import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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

const useActiveSection = () => {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
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

  return activeId;
};

const TocLink = ({
  id,
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick?: () => void;
}) => (
  <a
    href={`#${id}`}
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all duration-200",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
    <span>{label}</span>
  </a>
);

const MobileToc = ({ activeId }: { activeId: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeSection = sections.find((s) => s.id === activeId) || sections[0];
  const ActiveIcon = activeSection.icon;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="lg:hidden sticky top-16 z-40 px-4 py-2 bg-background/80 backdrop-blur-md border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg border border-border bg-background text-sm"
      >
        <span className="flex items-center gap-2">
          <ActiveIcon className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium">{activeSection.label}</span>
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        )}
      >
        <div className="rounded-lg border border-border bg-background p-2 shadow-lg space-y-0.5">
          {sections.map(({ id, label, icon }) => (
            <TocLink
              key={id}
              id={id}
              label={label}
              icon={icon}
              isActive={activeId === id}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutTableOfContents = () => {
  const activeId = useActiveSection();

  return (
    <>
      {/* Mobile dropdown */}
      <MobileToc activeId={activeId} />

      {/* Desktop sidebar */}
      <nav className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-6 z-40 w-48">
        <div className="rounded-xl border border-border bg-background/80 backdrop-blur-md p-3 shadow-lg">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            On this page
          </p>
          <ul className="space-y-1">
            {sections.map(({ id, label, icon }) => (
              <li key={id}>
                <TocLink id={id} label={label} icon={icon} isActive={activeId === id} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AboutTableOfContents;
