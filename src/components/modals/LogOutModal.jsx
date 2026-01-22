import { createPortal } from "react-dom";
import logoutIcon from "../../assets/icons/logout-icon.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modals/modalsSlice";
import { logoutAct } from "../../store/profile/profileSlice";
import { BiLoaderAlt } from "react-icons/bi";

const LogOutModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { logoutModal } = useSelector((state) => state.modals);
  const { logOutLoading } = useSelector((state) => state.profile);

  if (!logoutModal) return null;

  const onClose = () => {
    dispatch(closeModal("logoutModal"));
  };

  const handleLogout = () => {
    dispatch(logoutAct())
      .unwrap()
      .then(() => onClose());
  };

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div
        className="modal-box space-y-4 text-center "
        onClick={(e) => e.stopPropagation()}
      >
        <img loading="lazy" src={logoutIcon} alt="logout" className="mx-auto" />
        <h3 className="font-bold text-lg">{t("logOutModal.logoutConfirm")}</h3>
        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn bg-red-700 text-white rounded-lg"
          >
            {t("logOutModal.cancel")}
          </button>
          <button
            disabled={logOutLoading}
            onClick={handleLogout}
            className="mainBtn"
          >
            {logOutLoading && <BiLoaderAlt className="size-4 animate-spin" />}
            {t("logOutModal.logout")}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};

export default LogOutModal;
