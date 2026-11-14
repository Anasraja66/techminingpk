import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-200",
        scrolled ? "bg-surface/90 backdrop-blur-md" : "bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 xl:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="state-layer whitespace-nowrap rounded-full px-4 py-2 type-label-lg text-muted-foreground"
              activeProps={{ className: "bg-primary-container text-on-primary-container" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="outline" asChild>
            <Link to="/contact">Book Site Audit</Link>
          </Button>
          <Button asChild>
            <Link to="/advisor">
                <Sparkles /> AI Site Advisor
              </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto text-foreground md:ml-0 xl:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] rounded-r-[16px] border-0 bg-surface-low p-3">
            <SheetTitle className="px-4 pt-3 pb-4">
              <Logo />
            </SheetTitle>
            <nav className="flex flex-col gap-0.5" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="state-layer flex h-14 items-center rounded-full px-4 type-label-lg text-muted-foreground"
                  activeProps={{ className: "bg-primary-container text-on-primary-container" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2 border-t border-outline-variant px-1 pt-6">
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link to="/contact">Book Site Audit</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/advisor">
                <Sparkles /> AI Site Advisor
              </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className={cn("h-px transition-colors", scrolled ? "bg-outline-variant" : "bg-transparent")} />
    </header>
  );
}
