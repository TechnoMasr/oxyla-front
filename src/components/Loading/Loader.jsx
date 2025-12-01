import { useTranslation } from "react-i18next";
import logoImg from "../../assets/images/logo/logo.png";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center">
      <img src={logoImg} alt="Logo" className="w-16 lg:w-22 animate-bounce" />

      <h2 className="text-xl font-bold text-myBlue-2 mt-4">
        {t("loading")} ...
      </h2>
    </div>
  );
};

export default Loader;
