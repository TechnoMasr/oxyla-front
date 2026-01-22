import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../store/modals/modalsSlice";

const useRequireAuth = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const requireAuth = (onSuccess) => {
    if (!profile) {
      dispatch(openModal("requiredLoginModal"));
      return;
    }

    if (!profile.is_verified) {
      dispatch(openModal("requiredVerifyEmailModal"));
      return;
    }

    onSuccess();
  };

  return requireAuth;
};

export default useRequireAuth;
