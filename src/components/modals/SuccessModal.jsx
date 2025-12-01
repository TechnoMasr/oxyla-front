import { createPortal } from "react-dom";
import { MdDone } from "react-icons/md";

const SuccessModal = ({ openModal, onClose, msg, onConfirm, btnText }) => {
  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div className="modal-box space-y-4" onClick={(e) => e.stopPropagation()}>
        <div
          className="w-18 h-18 rounded-full bg-myGreen text-white text-7xl
          flex items-center justify-center mx-auto"
        >
          <MdDone />
        </div>

        <p className="text-center text-lg font-semibold">{msg}</p>

        <button onClick={onConfirm} className="mainBtn mx-auto">
          {btnText || "OK"}
        </button>
      </div>
    </dialog>,
    document.body
  );
};

export default SuccessModal;
