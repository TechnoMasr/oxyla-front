import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../Loading/LoadingModal";
import { CiGlobe } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

import flagAR from "../../assets/icons/flag-ar.png";
import flagEN from "../../assets/icons/flag-en.png";

const LanguageSwitcher = ({ home = false }) => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleSelect = (newLang) => {
    if (newLang !== lang) {
      dispatch(changeLanguage(newLang));
      setOpenLoading(true);

      // قفل اللودينج بعد وقت بسيط
      setTimeout(() => setOpenLoading(false), 700);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        {home ? (
          <div
            tabIndex={0}
            className="px-2 py-1 bg-white text-black rounded-full cursor-pointer flex items-center gap-1"
          >
            {lang === "ar" ? "العربية" : "English"} <MdKeyboardArrowDown />
          </div>
        ) : (
          <div tabIndex={0} className="cursor-pointer text-2xl text-myPurple">
            <CiGlobe />
          </div>
        )}

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-lg space-y-1"
        >
          <li onClick={() => handleSelect("ar")}>
            <button
              className={`flex items-center gap-2 font-semibold text-lg ${
                lang === "ar" ? "font-bold bg-myBlue text-white" : ""
              }`}
            >
              <img src={flagAR} alt="Arabic" className="w-6 rounded" />
              <p>العربية</p>
            </button>
          </li>

          <li onClick={() => handleSelect("en")}>
            <button
              className={`flex items-center gap-2 ${
                lang === "en" ? "font-bold bg-myBlue text-white" : ""
              }`}
            >
              <img src={flagEN} alt="English" className="w-6 rounded" />
              <p>English</p>
            </button>
          </li>
        </ul>
      </div>

      <LoadingModal openModal={openLoading} />
    </>
  );
};

export default LanguageSwitcher;
