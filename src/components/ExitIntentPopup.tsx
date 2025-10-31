import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // respect prior view this session
    const seen = sessionStorage.getItem("exit_intent_seen");
    if (seen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem("exit_intent_seen", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("keydown", onKeyDown);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close popup"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Wait, before you go…</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Download our free GCC database with <span className="font-semibold">100+ verified India centers</span>.
            See locations, functions, headcount ranges, and tech stack snapshots.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 text-left">
              <div className="bg-primary/10 text-primary p-2 rounded-full flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">100+ India GCC centers</p>
                <p className="text-sm text-muted-foreground">Verified entries ready to use</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="bg-primary/10 text-primary p-2 rounded-full flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Instant download</p>
                <p className="text-sm text-muted-foreground">Receive it immediately</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="bg-primary/10 text-primary p-2 rounded-full flex-shrink-0 mt-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">No credit card required</p>
              </div>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
          >
            <Link to="/gcc-list" onClick={() => setIsVisible(false)}>
              Get the free GCC data
            </Link>
          </Button>

          <button
            onClick={() => setIsVisible(false)}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
