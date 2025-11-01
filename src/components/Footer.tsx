import logo from "@/assets/researchnxt-logo.png";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Research NXT" className="h-12 transition-transform duration-300 hover:scale-105" />
        </div>
        
        <div className="text-sm text-muted-foreground">
          © 2025 Research NXT. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
