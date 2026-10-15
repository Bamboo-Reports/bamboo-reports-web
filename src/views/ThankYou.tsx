import { RiArrowRightLine, RiCheckboxCircleLine } from "@remixicon/react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";

const ThankYou = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 border-b bg-secondary/30 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <RiCheckboxCircleLine className="h-10 w-10 text-primary" aria-hidden />
          <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">Thank you.</h1>
          <p className="mt-4 text-lg text-muted-foreground">We've received your details. Our team will be in touch shortly.</p>
          <p className="mt-3 text-muted-foreground">Until then, you can read our latest GCC reports.</p>

          <div className="mt-10 border-t">
            <CalSchedulingButton className="group grid min-h-20 w-full grid-cols-[1fr_auto] items-center gap-4 border-b py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span><span className="block text-lg font-semibold">Book a call</span><span className="mt-1 block text-sm text-muted-foreground">Book a time directly with our team</span></span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Get a demo<RiArrowRightLine className="h-4 w-4" aria-hidden /></span>
            </CalSchedulingButton>
            <Link href="/resources" className="group grid min-h-20 w-full grid-cols-[1fr_auto] items-center gap-4 border-b py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span><span className="block text-lg font-semibold">Read our reports</span><span className="mt-1 block text-sm text-muted-foreground">GCC market reports from our team</span></span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">View resources<RiArrowRightLine className="h-4 w-4" aria-hidden /></span>
            </Link>
          </div>
        </div>
      </main>
      <Footer showCta={false} />
    </div>
  );
};

export default ThankYou;
