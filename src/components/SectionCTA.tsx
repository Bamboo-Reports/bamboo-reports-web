import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionCTAProps {
  title: string;
  description?: string;
  primaryAction: {
    text: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

const SectionCTA = ({ title, description, primaryAction, secondaryAction }: SectionCTAProps) => {
  return (
    <div className="mt-12 text-center p-8 bg-primary/5 rounded-2xl border border-primary/10">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {primaryAction.external ? (
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <a
              href={primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {primaryAction.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Link to={primaryAction.href}>
              {primaryAction.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}

        {secondaryAction && (
          secondaryAction.external ? (
            <Button asChild size="lg" variant="outline">
              <a
                href={secondaryAction.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryAction.text}
              </a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="outline">
              <Link to={secondaryAction.href}>
                {secondaryAction.text}
              </Link>
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default SectionCTA;
