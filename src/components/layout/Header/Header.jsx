import { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi"; // أحدث وأشيك للمنيو
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.png";
import NavBar from "./NavBar/NavBar";
import HeaderAction from "./HeaderAction";
import NavBarMobile from "./NavBar/NavBarMobile";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetting } from "../../../store/setting/setting";
import {
  getCartCountAct,
  getProfileAct,
} from "../../../store/profile/profileSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const headerRef = useRef();
  const { setting } = useSelector((state) => state.setting);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
    dispatch(fetchSetting());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartCountAct());
  }, [dispatch, location.pathname]);

  const { t } = useTranslation();

  const linksList = [
    { name: t("Header.home"), path: "/" },
    { name: t("Header.aboutUs"), path: "/pages/about-us" },
    { name: t("Header.services"), path: "/services" },
    { name: t("Header.contact"), path: "/contact-us" },
  ];

  return (
    <header
      ref={headerRef}
      className="container fixed left-1/2 -translate-x-1/2 top-4 z-50 px-4 sm:px-0"
    >
      <div className="flex flex-col py-2 px-4 lg:px-10 bg-white/90 backdrop-blur-md shadow-lg border border-white/20 rounded-3xl transition-all duration-300">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            {/* زرار فتح وغلق المنيو بتصميم حديث */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setActiveNav((prev) => !prev)}
              className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-2xl bg-myPurple/10 text-myPurple hover:bg-myPurple hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <IoClose
                  className={`text-2xl transition-all duration-300 absolute ${
                    activeNav
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
                <HiMenuAlt3
                  className={`text-2xl transition-all duration-300 ${
                    activeNav
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
              </div>
            </button>

            <Link
              to="/"
              onClick={() => setActiveNav(false)}
              className="flex items-center gap-2 group"
            >
              <img
                loading="lazy"
                src={setting?.logo || logo}
                alt="Logo"
                className="w-14 lg:w-18"
              />
            </Link>
          </div>

          <div className="flex items-center gap-10">
            <NavBar setActiveNav={setActiveNav} links={linksList} />
            <HeaderAction setActiveNav={setActiveNav} />
          </div>
        </div>

        <NavBarMobile
          setActiveNav={setActiveNav}
          activeNav={activeNav}
          links={linksList}
        />
      </div>
    </header>
  );
};

export default Header;
