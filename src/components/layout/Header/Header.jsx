import { useState, useEffect, useRef } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.png";
import NavBar from "./NavBar/NavBar";
import HeaderAction from "./HeaderAction";
import NavBarMobile from "./NavBar/NavBarMobile";
import { useDispatch } from "react-redux";
import { fetchSetting } from "../../../store/setting/setting";
import {
  getCartCountAct,
  getProfileAct,
} from "../../../store/profile/profileSlice";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const headerRef = useRef();

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
    { name: t("Header.aboutUs"), path: "/about-us" },
    { name: t("Header.services"), path: "/services" },
    { name: t("Header.contact"), path: "/contact-us" },
  ];

  return (
    <header
      ref={headerRef}
      className="container fixed left-1/2 -translate-x-1/2 top-4 z-50"
    >
      <div className="flex flex-col py-2 px-4 lg:px-10 bg-white/90 backdrop-blur shadow-md rounded-3xl">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-1">
            <span
              className="text-3xl text-myPurple cursor-pointer lg:hidden"
              onClick={() => {
                setActiveNav((prev) => !prev);
              }}
            >
              {activeNav ? <IoClose /> : <BiMenuAltRight />}
            </span>

            <Link
              to="/"
              onClick={() => setActiveNav(false)}
              className="flex items-center gap-2 group"
            >
              <img
                loading="lazy"
                src={logo}
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
