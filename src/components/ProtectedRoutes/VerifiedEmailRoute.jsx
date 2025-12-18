import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";

const VerifiedEmailRoute = ({ children }) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (profile && !profile.is_verified) {
      setOpenModal(true);
    }
  }, [profile]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/verify-email", { replace: true });
  };

  const handleClose = () => {
    setOpenModal(false);
    navigate("/", { replace: true });
  };

  // ⭐ لو الإيميل verified → رجّع الأطفال
  if (profile?.is_verified) return <>{children}</>;

  return (
    <ProtectModal
      open={openModal}
      title={t("VerifiedEmailRoute.title")}
      message={t("VerifiedEmailRoute.message")}
      confirmText={t("VerifiedEmailRoute.confirm")}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};

export default VerifiedEmailRoute;
