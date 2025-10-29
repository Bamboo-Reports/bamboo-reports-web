import logo from "@/assets/bamboo-logo.svg";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Bamboo Reports" className="h-10" />
          <span className="text-2xl font-bold">
            <span className="text-foreground">Research</span>
            <span className="text-accent">NXT</span>
          </span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © 2025 Research NXT. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
