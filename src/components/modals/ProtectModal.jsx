import { createPortal } from "react-dom";
import icon from "../../assets/icons/chat-external-icon.png";

const ProtectModal = ({
  open,
  title,
  message,
  confirmText = "Ok",
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box space-y-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={icon} alt="chat externally icon" className="w-18 mx-auto" />
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{message}</p>
        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn bg-red-700 text-white rounded-lg"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className="mainBtn">
            {confirmText}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default ProtectModal;
