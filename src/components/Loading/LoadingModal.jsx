import Loader from "./Loader";
import { createPortal } from "react-dom";

const LoadingModal = ({ openModal }) => {
  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open backdrop-blur-2xl bg-black/90`}>
      <div className="flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
        <Loader />
      </div>
    </dialog>,
    document.body
  );
};

export default LoadingModal;
