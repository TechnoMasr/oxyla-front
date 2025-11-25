import logo from "../../../assets/images/oxela-home-logo/logo-full.png";

const HomeHeader = ({ setOpenMenu }) => {
  return (
    <>
      <img
        src={logo}
        alt="Oxyla Logo"
        className="absolute z-20 top-4 start-4 w-28"
      />

      <div className="absolute z-20 top-4 end-4 flex items-center gap-4">
        <button className="px-2 py-1 bg-white text-black rounded-full">
          English
        </button>
        <button
          onClick={() => setOpenMenu(true)}
          className="px-2 py-1 text-white font-bold text-2xl cursor-pointer"
        >
          MENU
        </button>
      </div>
    </>
  );
};

export default HomeHeader;
