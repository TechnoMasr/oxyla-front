import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";

const AuthGuard = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  // لو user موجود → رجّعه للهوم
  if (profile) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
