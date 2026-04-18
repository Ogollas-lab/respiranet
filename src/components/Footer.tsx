import { Stethoscope, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 sm:py-12 bg-card border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-bg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">LungAI</span>
              <p className="text-xs text-muted-foreground">Respiratory Analysis System</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-destructive" />
            <span>for better respiratory health</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 LungAI. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
