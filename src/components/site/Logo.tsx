import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  // Faceted crystal — drawn with flat tonal facets, no glow.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 2 27 10 16 30 5 10Z" className="fill-primary" />
      <path d="M16 2 21 10 16 30Z" className="fill-on-primary-container" />
      <path d="M5 10h22L16 2Z" className="fill-inverse-primary" />
      <path d="M11 10 16 2l5 8Z" className="fill-primary-container" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-full pr-2" aria-label="TechMining home">
      <LogoMark />
      <span className="type-title-lg tracking-tight text-foreground">
        Tech<span className="text-primary">Mining</span>
      </span>
    </Link>
  );
}
