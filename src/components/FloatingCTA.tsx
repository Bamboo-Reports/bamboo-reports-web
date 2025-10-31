import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      <Button
        asChild
        size="lg"
        className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg px-6 py-6 rounded-full font-bold text-base animate-fade-in"
      >
        <Link to="/gcc-list">Get Free GCC Data</Link>
      </Button>
      
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="outline"
        className="rounded-full shadow-lg bg-background/95 backdrop-blur-sm"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingCTA;
