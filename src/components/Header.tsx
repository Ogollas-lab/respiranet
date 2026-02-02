import { useState } from "react";
import { Activity, Stethoscope, User, LogOut, History } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
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
          </Link>
          
          <nav className="flex items-center gap-4">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Features
            </a>
            <a href="#analyze" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Analyze
            </a>
            
            {loading ? (
              <div className="h-9 w-20 bg-secondary rounded-md animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline max-w-24 truncate">
                      {user.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/history" className="flex items-center gap-2 cursor-pointer">
                      <History className="h-4 w-4" />
                      Analysis History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)} variant="outline" size="sm">
                Sign In
              </Button>
            )}

            <ThemeToggle />
            
            <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-secondary-foreground hidden sm:inline">AI Ready</span>
            </div>
          </nav>
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;
