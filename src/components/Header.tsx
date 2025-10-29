import logo from "@/assets/bamboo-logo.svg";

const Header = () => {
  return (
    <header className="py-6 px-4 border-b">
      <div className="max-w-7xl mx-auto">
        <img src={logo} alt="Bamboo Reports" className="h-12" />
      </div>
    </header>
  );
};

export default Header;
