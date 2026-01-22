import { useSelector } from "react-redux";
import LoadingPage from "../Loading/LoadingPage";
import { Navigate } from "react-router-dom";

const VerifyEmailGuard = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.profile);

  if (loading) return <LoadingPage />;

  if (profile?.is_verified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VerifyEmailGuard;
