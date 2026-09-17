import type { Metadata } from "next";

// Phase 1 placeholder: proves the Next.js scaffold deploys. The real homepage
// (src/views/IndexV2.tsx) is wired up in phase 2.
export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Bamboo Reports</h1>
      <p className="mt-4 text-muted-foreground">
        Next.js scaffold. Pages are being migrated.
      </p>
    </main>
  );
}
