import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../Loading/LoadingModal";
import { CiGlobe } from "react-icons/ci";

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
        className="px-2.5 py-1 text-sm bg-white text-myPurple border border-myPurple rounded-full cursor-pointer flex items-center gap-1 shadow-sm rtl:font-[Manrope] ltr:font-[Cairo]"
      >
        {/* النص للشاشات الكبيرة (md وأكبر) */}
        <span className="hidden md:inline">
          {lang === "en" ? "العربية" : "English"}
        </span>

        {/* النص للشاشات الصغيرة (أصغر من md) */}
        <span className="inline md:hidden uppercase font-semibold">
          {lang === "en" ? "ar" : "en"}
        </span>

        <CiGlobe className="text-xl" />
      </div>

      <LoadingModal openModal={openLoading} />
    </>
  );
};

export default LanguageSwitcher;
