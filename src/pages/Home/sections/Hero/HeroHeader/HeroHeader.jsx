import logo from "../../../../../assets/images/oxela-home-logo/logo-full.png";

const HeroHeader = () => {
  return (
    <header className="absolute z-20 top-0 left-0 w-full">
      <div className="container py-4 flex items-start justify-between">
        <img src={logo} alt="Oxyla Logo" className="w-32" />

        <div className="flex items-center gap-4">
          <button className="px-2 py-1 bg-white text-black rounded-full">
            English
          </button>
          <button className="px-2 py-1 text-white font-bold text-2xl cursor-pointer">MENU</button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
