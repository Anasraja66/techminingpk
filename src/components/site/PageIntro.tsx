import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="type-label-sm uppercase tracking-[0.12em] text-primary">{children}</p>;
}

export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 md:pt-20">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-3 max-w-3xl type-display-md text-foreground">{title}</h1>
      {children && <p className="mt-5 max-w-2xl type-body-lg text-muted-foreground">{children}</p>}
    </section>
  );
}
