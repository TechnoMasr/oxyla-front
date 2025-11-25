import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";
import LoadingPage from "../Loading/LoadingPage";

const PublicRoute = ({ children }) => {
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
    // لو عايز يسمح للمستخدم بالبقاء في صفحة تسجيل الدخول رغم لوجن، تقدر تحط هنا منطق آخر
    navigate("/", { replace: true });
  };

  // لو المستخدم مش لوجن نسمح بالدخول (مثلاً صفحتي login/register)
  if (!loading && (!token || !profile)) {
    return <>{children}</>;
  }

  if (loading) return <LoadingPage />;

  return (
    <>
      <ProtectModal
        open={openModal}
        title="Already Logged In"
        message="You are already logged in. You cannot access this page while logged in."
        confirmText="Go to Home"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};

export default PublicRoute;
