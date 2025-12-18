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

  const changeLangWithLoading = (newLang) => {
    if (newLang !== lang) {
      dispatch(changeLanguage(newLang));
      setOpenLoading(true);
    }
  };

  // ---------------------------
  // 🌟 في حالة الهوم: Toggle Button
  // ---------------------------
  if (home) {
    return (
      <>
        <div
          onClick={() => changeLangWithLoading(lang === "ar" ? "en" : "ar")}
          className="px-3 py-1 bg-white text-black rounded-full cursor-pointer flex items-center gap-2 shadow-sm rtl:font-[Manrope] ltr:font-[Cairo]"
        >
          <span>{lang === "en" ? "العربية" : "English"}</span>
        </div>

        <LoadingModal openModal={openLoading} />
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => changeLangWithLoading(lang === "ar" ? "en" : "ar")}
        className="px-2 py-1 text-sm bg-white text-myPurple border border-myPurple rounded-full cursor-pointer flex items-center gap-1 shadow-sm rtl:font-[Manrope] ltr:font-[Cairo]"
      >
        {lang === "en" ? "العربية" : "English"} <CiGlobe className="text-xl" />
      </div>

      <LoadingModal openModal={openLoading} />
    </>
  );

  // ---------------------------
  // 🌟 غير كده: Dropdown العادي
  // ---------------------------
  //   return (
  //     <>
  //       <div className="dropdown dropdown-end">
  //         <div tabIndex={0} className="cursor-pointer text-3xl text-myPurple">
  //           <CiGlobe />
  //         </div>

  //         <ul
  //           tabIndex={0}
  //           className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-lg space-y-1"
  //         >
  //           <li onClick={() => changeLangWithLoading("ar")}>
  //             <button
  //               className={`flex items-center gap-2 font-semibold ${
  //                 lang === "ar" ? "bg-myPurple text-white" : ""
  //               }`}
  //             >
  //               <img loading="lazy" src={flagAR} alt="Arabic" className="w-6 rounded" />
  //               <p>العربية</p>
  //             </button>
  //           </li>

  //           <li onClick={() => changeLangWithLoading("en")}>
  //             <button
  //               className={`flex items-center gap-2 ${
  //                 lang === "en" ? "bg-myPurple text-white" : ""
  //               }`}
  //             >
  //               <img loading="lazy" src={flagEN} alt="English" className="w-6 rounded" />
  //               <p>English</p>
  //             </button>
  //           </li>
  //         </ul>
  //       </div>

  //       <LoadingModal openModal={openLoading} />
  //     </>
  //   );
};

export default LanguageSwitcher;
