import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../modals/ProtectModal";
import LoadingPage from "../Loading/LoadingPage";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("tokenOx");
  const { profile, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!token || !profile) {
      setOpenModal(true);
    }
  }, [token, profile, loading]);

  const handleConfirm = () => {
    setOpenModal(false);
    navigate("/signin", { replace: true });
  };

  const handleClose = () => {
    setOpenModal(false);
    // لو عايز تمنع البقاء على الصفحة الحالية ممكن نرجع للصفحة الرئيسية:
    navigate("/", { replace: true });
  };

  // لو فيه توكن وبروفايل نعرض المحتوى
  if (!loading && token && profile) {
    return <>{children}</>;
  }

  // أثناء تحميل البروفايل نقدر نعرض عنصر لودينج بسيط
  if (loading) return <LoadingPage />;

  // بخلاف ذلك، نعرض المودال التنبيهي فقط
  return (
    <>
      <ProtectModal
        open={openModal}
        title="Login Required"
        message="You need to be logged in to access this page. Would you like to go to the login page now?"
        confirmText="Go to Login"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};

export default ProtectedRoute;
