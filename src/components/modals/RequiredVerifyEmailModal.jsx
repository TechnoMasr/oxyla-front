import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals/modalsSlice";
import warningIcon from "../../assets/icons/Warning-icon.png";

const RequiredVerifyEmailModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requiredVerifyEmailModal } = useSelector((state) => state.modals);

  if (!requiredVerifyEmailModal) return null;

  const onClose = () => {
    dispatch(closeModal("requiredVerifyEmailModal"));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleVerify = () => {
    navigate("/verify-email");
    onClose();
  };

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box space-y-4 text-center sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          loading="lazy"
          src={warningIcon}
          alt="logout"
          className="mx-auto w-44"
        />
        <h3 className="font-bold text-lg">
          {t("requiredVerifyEmailModal.title")}
        </h3>
        <p className="text-sm">{t("requiredVerifyEmailModal.description")}</p>
        <div className="flex justify-center items-center flex-wrap gap-2">
          <button onClick={handleVerify} className="mainBtn flex-1">
            {t("requiredVerifyEmailModal.goToVerify")}
          </button>
          <button
            onClick={handleCancel}
            className="btn bg-red-700 text-white rounded-lg flex-1"
          >
            {t("requiredVerifyEmailModal.cancel")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};

export default RequiredVerifyEmailModal;
