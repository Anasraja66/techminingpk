import type { Status } from "@/lib/platform";
import { cn } from "@/lib/utils";

/** "Live" = available today; "Planned" = on the roadmap, not yet sold as working. */
export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const live = status === "Live";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 py-0.5 type-label-sm",
        live
          ? "bg-success-container text-on-success-container"
          : "border border-dashed border-outline bg-surface-lowest text-muted-foreground",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", live ? "bg-success" : "bg-outline")} aria-hidden="true" />
      {status}
    </span>
  );
}
