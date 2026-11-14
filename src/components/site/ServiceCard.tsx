import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type Service = {
  n: string;
  tag: string;
  image: string;
  imageAlt: string;
  caption: string;
  captionIcon: LucideIcon;
  title: string;
  body: string;
  outcome: string;
};

/** MD3 outlined media card: real photo, chip, caption pill, body and an outcome footer. */
export function ServiceCard({ s }: { s: Service }) {
  const Icon = s.captionIcon;
  return (
    <Link
      to="/solutions"
      className="group card-outlined flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-surface-high">
        <img
          src={s.image}
          alt={s.imageAlt}
          width={1024}
          height={768}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-sm bg-surface-lowest px-2.5 py-1 type-label-sm uppercase tracking-wide text-primary shadow-elev-1">
          Pillar {s.n} · {s.tag}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sm bg-inverse-surface/85 px-2.5 py-1.5 font-mono text-[12px] text-inverse-on-surface">
          <Icon className="size-3.5" />
          {s.caption}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="type-title-lg text-foreground transition-colors group-hover:text-primary">
          {s.title}
        </h3>
        <p className="mt-3 mb-6 type-body-md text-muted-foreground">{s.body}</p>

        <div className="mt-auto flex items-center gap-3 border-t border-outline-variant pt-4">
          <span className="type-label-lg text-primary">{s.outcome}</span>
          <ArrowRight className="ml-auto size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
