import { useState } from "react";
import { Activity, Stethoscope, User, LogOut, History, Menu } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        to="/about"
        onClick={() => setMobileNavOpen(false)}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        About
      </Link>
      <a
        href="/#features"
        onClick={() => setMobileNavOpen(false)}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Features
      </a>
      <a
        href="/#analyze"
        onClick={() => setMobileNavOpen(false)}
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Analyze
      </a>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl gradient-bg shadow-md flex-shrink-0">
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-base sm:text-lg font-bold text-foreground leading-tight">
                LungAI
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block sm:block truncate">
                Respiratory Analysis System
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks}

            {loading ? (
              <div className="h-9 w-20 bg-secondary rounded-md animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-24 truncate">
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
              <span className="text-xs font-medium text-secondary-foreground">AI Ready</span>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
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
            )}
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <nav className="flex flex-col gap-4">{navLinks}</nav>
                  {!loading && !user && (
                    <Button
                      onClick={() => {
                        setMobileNavOpen(false);
                        setAuthModalOpen(true);
                      }}
                      variant="outline"
                    >
                      Sign In
                    </Button>
                  )}
                  <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 self-start">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-secondary-foreground">AI Ready</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;
