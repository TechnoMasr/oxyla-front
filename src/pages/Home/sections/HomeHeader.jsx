import { useTranslation } from "react-i18next";
import logo from "../../../assets/images/oxela-home-logo/logo-full.png";
import LanguageSwitcher from "../../../components/common/LanguageSwitcher";
import { useEffect, useState } from "react";

const HomeHeader = ({ setOpenMenu }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <img
        loading="lazy"
        src={logo}
        alt="Oxyla Logo"
        className="absolute z-20 top-4 inset-s-4 w-28"
      />

      <div className="absolute z-20 top-4 inset-e-30">
        <LanguageSwitcher home />
      </div>

      <div className="fixed z-20 top-3 inset-e-4">
        <button
          onClick={() => setOpenMenu(true)}
          className={`px-2 py-1 text-white font-bold text-2xl cursor-pointer uppercase
          border border-transparent rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-black/40 backdrop-blur-xl shadow-lg border-white/80"
              : "text-shadow bg-transparent"
          }`}
        >
          {t("Menu")}
        </button>
      </div>
    </>
  );
};

export default HomeHeader;
