import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold">{t("NotFound.title")}</h1>
      <h2 className="text-2xl font-bold">{t("NotFound.subtitle")}</h2>
      <Link to="/" replace className="mainBtn">
        {t("NotFound.goHome")}
      </Link>
    </section>
  );
};

export default NotFound;
