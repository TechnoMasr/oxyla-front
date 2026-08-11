import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals/modalsSlice";
import warningIcon from "../../assets/icons/Warning-icon.png";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const RequiredLoginModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requiredLoginModal } = useSelector((state) => state.modals);

  if (!requiredLoginModal) return null;

  const onClose = () => {
    dispatch(closeModal("requiredLoginModal"));
  };

  const handleCreateAccount = () => {
    navigate("/signup");
    onClose();
  };

  const handleLogin = () => {
    navigate("/signin");
    onClose();
  };

  return createPortal(
    <dialog className="modal modal-open" onClick={onClose}>
      <div
        className="modal-box relative space-y-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 btn btn-sm btn-circle btn-ghost"
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>

        <img
          loading="lazy"
          src={warningIcon}
          alt="warning"
          className="mx-auto w-44"
        />

        <h3 className="font-bold text-lg">{t("requiredLoginModal.title")}</h3>

        <p className="text-sm">{t("requiredLoginModal.description")}</p>

        <div className="flex justify-center items-center flex-wrap gap-2">
          <button onClick={handleLogin} className="mainBtn flex-1">
            {t("requiredLoginModal.login")}
          </button>

          <button
            onClick={handleCreateAccount}
            className="btn bg-red-700 text-white rounded-lg flex-1"
          >
            {t("requiredLoginModal.createAccount")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};

export default RequiredLoginModal;
