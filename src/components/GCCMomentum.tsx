import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GCCMomentum = () => {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Which cities are winning the next wave of GCC mandates?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Q4 snapshot tracks the shifts in headcount, capability mix, and leadership depth across India's GCC landscape — so you can spot the signals before your competitors do.
            </p>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full"
            >
              <Link to="/reports/gcc-snapshot-q4">GET THE REPORT</Link>
            </Button>
          </div>

          <div className="flex justify-center">
            <img
              src="https://6xcp0wpjej.ufs.sh/f/9zK5qxoTPnKvJxynEBxTSsyCtN4UrElocuAhdMjDkZBHnO0R"
              alt="India GCC Q4 Snapshot Report"
              className="w-full max-w-2xl rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GCCMomentum;
