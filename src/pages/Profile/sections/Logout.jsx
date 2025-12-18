import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logoutAct } from "../../../store/profile/profileSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAct());
    navigate("/", { replace: true });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        {t("logoutPage.title")}
      </h2>

      <div className="flex flex-col items-center gap-4 h-full">
        <span className="text-5xl text-white bg-myGreen p-2 rounded-full">
          <RiLogoutCircleLine />
        </span>

        <h1 className="text-2xl font-bold">{t("logoutPage.confirmMessage")}</h1>

        <button className="mainBtn" onClick={handleLogout}>
          {t("logoutPage.logoutBtn")}
        </button>
      </div>
    </section>
  );
};

export default Logout;
