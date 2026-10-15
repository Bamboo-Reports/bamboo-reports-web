import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { NavItem } from "@/config/nav";
import { cn } from "@/lib/utils";

/**
 * Renders an internal Next link or an external anchor based on `item.external`.
 * External links open in a new tab, say so to screen readers and show an icon.
 */
const NavLink = ({
  item,
  className,
  children,
  withIcon = true,
}: {
  item: NavItem;
  className?: string;
  children?: React.ReactNode;
  /** Set false when the caller places its own trailing icon. */
  withIcon?: boolean;
}) => {
  const content = (
    <>
      {children ?? item.label}
      {item.external && withIcon ? <ArrowUpRight className="size-4 shrink-0" aria-hidden /> : null}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center gap-1.5", className)}
      >
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={item.href} className={cn("inline-flex items-center gap-1.5", className)}>
      {content}
    </Link>
  );
};

export default NavLink;
