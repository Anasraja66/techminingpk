import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "See your concession through TechMining.",
  body = "A two-day on-site audit maps your weighbridge, fleet and grade-control gaps — with a written loss estimate.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-6 rounded-[28px] bg-primary px-6 py-10 text-primary-foreground sm:px-10 md:flex-row md:items-center md:py-12">
        <div className="max-w-2xl">
          <h2 className="type-headline-lg">{title}</h2>
          <p className="mt-3 type-body-lg opacity-85">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:ml-auto">
          <Button size="lg" variant="onPrimary" asChild>
            <Link to="/contact">
              Schedule a Mine Audit <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
