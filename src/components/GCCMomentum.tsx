import { Button } from "@/components/ui/button";
import gccMomentumReport from "@/assets/gcc-momentum-report.png";

const GCCMomentum = () => {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Ride the Wave of India's GCC Momentum</h2>
            <p className="text-lg text-muted-foreground mb-8">
              A quick guide with insights on GCC growth over the past year and a snapshot of the latest quarter
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full">
              GET YOUR REPORT NOW
            </Button>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={gccMomentumReport} 
              alt="GCC Momentum Report" 
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GCCMomentum;
