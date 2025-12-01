import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";
import LoadingPage from "../Loading/LoadingPage";
import { useTranslation } from "react-i18next";

const PublicRoute = ({ children }) => {
  const { t } = useTranslation();
  const token = Cookies.get("tokenOx");
  const { profile, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (token && profile) {
      setOpenModal(true);
    }
  }, [token, profile, loading]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  // user not logged in → allow access (login/register pages)
  if (!loading && (!token || !profile)) {
    return <>{children}</>;
  }

  if (loading) return <LoadingPage />;

  return (
    <>
      <ProtectModal
        open={openModal}
        title={t("PublicRoute.title")}
        message={t("PublicRoute.message")}
        confirmText={t("PublicRoute.confirm")}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};

export default PublicRoute;
