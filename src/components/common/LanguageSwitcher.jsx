import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../Loading/LoadingModal";
import { CiGlobe } from "react-icons/ci";

import flagAR from "../../assets/icons/flag-ar.png";
import flagEN from "../../assets/icons/flag-en.png";

const LanguageSwitcher = () => {
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
        <div tabIndex={0} className="cursor-pointer text-2xl text-myPurple">
          <CiGlobe />
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-lg space-y-1"
        >
          <li onClick={() => handleSelect("ar")}>
            <button
              className={`flex items-center gap-2 ${
                lang === "ar" ? "font-bold bg-myPurple text-white" : ""
              }`}
            >
              <img src={flagAR} alt="Arabic" className="w-8 rounded" />
              <p>العربية</p>
            </button>
          </li>

          <li onClick={() => handleSelect("en")}>
            <button
              className={`flex items-center gap-2 ${
                lang === "en" ? "font-bold bg-myPurple text-white" : ""
              }`}
            >
              <img src={flagEN} alt="English" className="w-8 rounded" />
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
