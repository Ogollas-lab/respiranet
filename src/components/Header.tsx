import { Activity, Stethoscope } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-md">
            <Stethoscope className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-foreground">
              LungAI
            </span>
            <span className="text-xs text-muted-foreground">
              Respiratory Analysis System
            </span>
          </div>
        </div>
        
        <nav className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#analyze" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Analyze
          </a>
          <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">AI Ready</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
