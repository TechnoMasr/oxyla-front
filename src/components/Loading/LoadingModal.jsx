import Loader from "./Loader";
import { createPortal } from "react-dom";

const LoadingModal = ({ openModal }) => {
  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`}>
      <div className="modal-box py-16" onClick={(e) => e.stopPropagation()}>
        <Loader />
      </div>
    </dialog>,
    document.body
  );
};

export default LoadingModal;
