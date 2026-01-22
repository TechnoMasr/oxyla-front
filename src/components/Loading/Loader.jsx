import { useTranslation } from "react-i18next";
import logoImg from "../../assets/images/logo/logo.png";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[300px]">
      <div className="relative flex items-center justify-center mb-10">
        <div className="w-28 h-28 rounded-full bg-myPurple/20 animate-ping absolute"></div>
        <div className="w-26 h-26 rounded-full bg-white flex items-center justify-center">
          <img
            loading="lazy"
            src={logoImg}
            alt="Logo"
            className="w-18 md:w-22"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-myBlue-2">{t("loading")}</h2>
    </div>
  );
};

export default Loader;
