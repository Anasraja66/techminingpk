import { Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck } from "lucide-react";

import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";

export function ComplianceStrip() {
  return (
    <section className="border-y border-outline-variant bg-surface-low">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-primary-container text-on-primary-container">
            <ShieldCheck className="size-5" />
          </span>
          <p className="type-title-md">Built for provincial compliance</p>
        </div>
        <ul className="flex flex-wrap gap-2 md:ml-auto">
          {[
            "Mines & Minerals Dept. Balochistan",
            "KP Mineral Development Act",
            "SIFC regulatory harmonization",
          ].map((t) => (
            <li
              key={t}
              className="rounded-sm border border-outline-variant bg-surface-lowest px-3 py-1.5 type-label-lg text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 type-body-md text-muted-foreground">
            Mineral intelligence and mining ERP for Pakistan's leaseholders, exporters and
            regulators — from satellite to weighbridge.
          </p>
          <p className="mt-6 flex items-center gap-2 type-label-lg text-foreground">
            <MapPin className="size-4 text-primary" /> Quetta · Islamabad · Karachi
          </p>
        </div>
        <div>
          <p className="type-label-sm uppercase text-muted-foreground">Platform</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="type-body-md text-foreground hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="type-label-sm uppercase text-muted-foreground">Company</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/contact" className="type-body-md text-foreground hover:text-primary">
                Book a site audit
              </Link>
            </li>
            <li>
              <Link to="/research" className="type-body-md text-foreground hover:text-primary">
                Scientific foundations
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="type-body-md text-foreground hover:text-primary">
                Engagement models
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 type-body-md text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} TechMining (Pvt.) Ltd.</span>
          <span>Made in Pakistan for Pakistan's mineral sector</span>
        </div>
      </div>
    </footer>
  );
}
