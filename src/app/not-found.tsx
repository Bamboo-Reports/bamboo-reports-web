import type { Metadata } from "next";
import Link from "next/link";

// Phase 1 placeholder. Phase 2 renders src/views/NotFound.tsx here once
// Header and Footer no longer depend on react-router-dom.
export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Bamboo Reports" },
  description: "The requested Bamboo Reports page could not be found.",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        <Link href="/" className="underline">
          Go to the homepage
        </Link>
      </p>
    </main>
  );
}
