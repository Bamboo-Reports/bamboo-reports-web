import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton-shimmer h-4 w-full rounded-md", className)} {...props} />;
}

export { Skeleton };
