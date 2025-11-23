import logo from "@/assets/researchnxt-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="Research NXT - GCC Intelligence Provider" className="h-12 mb-4 transition-transform duration-micro ease-smooth hover:scale-[1.02]" />
            <p className="text-sm text-muted-foreground">
              Leading GCC Intelligence platform for Global Capability Centers research and market intelligence.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/reports" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  GCC Reports
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  GCC Insights
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://meetings-na2.hubspot.com/anam-khoja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth"
                >
                  Book a Demo
                </a>
              </li>
              <li>
                <Link to="/gcc-list" className="text-muted-foreground hover:text-primary transition-colors duration-micro ease-smooth">
                  Get Free GCC Data
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Research NXT. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
