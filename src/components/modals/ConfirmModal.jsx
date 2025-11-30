import { createPortal } from "react-dom";

const ConfirmModal = ({
  openModal,
  onClose,
  onConfirm,
  btnText = "Confirm",
  confirmMsg,
  disabled = false,
}) => {
  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div className="modal-box space-y-4" onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-lg font-semibold">{confirmMsg}</p>

        <div className="modal-action justify-center">
          <button
            onClick={onClose}
            className="btn bg-red-700 text-white rounded-lg"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="mainBtn" disabled={disabled}>
            {btnText}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ConfirmModal;
