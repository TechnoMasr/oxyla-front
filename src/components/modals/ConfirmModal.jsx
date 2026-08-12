import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import FormError from "../form/FormError";

const ConfirmModal = ({
  openModal,
  onClose,
  onConfirm,
  btnText = "Confirm",
  confirmMsg,
  disabled = false,
  error,
}) => {
  const { t } = useTranslation();
  if (!openModal) return null;

  return createPortal(
    <dialog className="modal modal-open" onClick={onClose}>
      <div
        className="modal-box flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center lg:text-lg font-semibold">{confirmMsg}</div>
        <div className="flex items-center justify-center gap-2 mb-0">
          <button
            onClick={onClose}
            className="btn bg-red-700 text-white rounded-lg"
          >
            {t("Cancel")}
          </button>
          <button onClick={onConfirm} className="mainBtn" disabled={disabled}>
            {btnText}
          </button>
        </div>
        {error && <FormError errorMsg={error?.response?.data?.message} />}
      </div>
    </dialog>,
    document.body,
  );
};

export default ConfirmModal;
