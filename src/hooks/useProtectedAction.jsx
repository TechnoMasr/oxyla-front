import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProtectModal from "../components/modals/ProtectModal";

const useProtectedAction = () => {
  const { profile } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();

  const checkAuthBefore = (action) => {
    if (!profile) {
      setPendingAction(() => action);
      setOpen(true);
    } else {
      action();
    }
  };

  const confirmHandler = () => {
    setOpen(false);
    navigate("/signin");
  };

  const closeHandler = () => {
    setOpen(false);
    setPendingAction(null);
  };

  const Modal = (
    <ProtectModal
      open={open}
      title="Login Required"
      message="You need to login first to perform this action."
      confirmText="Login"
      onConfirm={confirmHandler}
      onClose={closeHandler}
    />
  );

  return { checkAuthBefore, ProtectModalUI: Modal };
};

export default useProtectedAction;
