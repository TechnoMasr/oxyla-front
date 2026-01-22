import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";

const ProtectedRoute = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  // لو مفيش user → رجّعه لصفحة signin
  if (!profile) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
