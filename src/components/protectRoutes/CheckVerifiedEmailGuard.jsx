import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingPage from "../../components/Loading/LoadingPage";
import { CiWarning } from "react-icons/ci";
import { useTranslation } from "react-i18next";

const CheckVerifiedEmailGuard = ({ children }) => {
  const { t } = useTranslation();
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  if (!profile?.is_verified) {
    return (
      <section className="h-[90vh] flex flex-col items-center justify-center gap-4 text-center">
        <CiWarning className="text-[120px] text-myPurple" />

        <h1 className="text-2xl font-bold">
          {t("checkVerifiedEmailGuard.title")}
        </h1>

        <h2 className="font-semibold">
          {t("checkVerifiedEmailGuard.description")}
        </h2>

        <Link to="/verify-email" className="mainBtn" replace>
          {t("checkVerifiedEmailGuard.button")}
        </Link>
      </section>
    );
  }

  return children;
};

export default CheckVerifiedEmailGuard;
