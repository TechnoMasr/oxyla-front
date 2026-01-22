import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { PiCalendarMinus } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { MdLogin } from "react-icons/md";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { openModal } from "../../../store/modals/modalsSlice";

const HeaderAction = ({ setActiveNav }) => {
  const { t } = useTranslation();
  const { profile, cartCount } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const profileList = [
    { name: t("headerActions.editProfile"), url: "", icon: <RiEdit2Line /> },
    {
      name: t("headerActions.notifications"),
      url: "notifications",
      icon: <BsBell />,
    },
    {
      name: t("headerActions.appointment"),
      url: "appointment",
      icon: <PiCalendarMinus />,
    },
    { name: t("headerActions.wishlist"), url: "wishlist", icon: <FiHeart /> },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      <LanguageSwitcher />

      {profile ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="cursor-pointer text-3xl text-myPurple">
            <FiUser />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
          >
            {profileList.map((item) => (
              <li key={item.name}>
                <Link
                  to={`/profile/${item.url}`}
                  className="flex gap-2 items-center text-myPurple"
                >
                  {item.icon}
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}

            <li
              onClick={() => {
                dispatch(openModal("logoutModal"));
              }}
            >
              <button className="flex gap-2 items-center bg-red-700 text-white">
                <TbLogout2 />
                <p>{t("headerActions.logout")}</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          to="/signin"
          className="text-3xl text-myPurple cursor-pointer"
          onClick={() => setActiveNav(false)}
        >
          <MdLogin title={t("headerActions.login")} />
        </Link>
      )}

      <Link
        to="/cart"
        className="text-3xl text-myPurple cursor-pointer relative"
        onClick={() => setActiveNav(false)}
      >
        <IoCartOutline />

        {cartCount > 0 && (
          <span className="absolute -top-1 -end-1 text-xs bg-myBlue text-white px-1 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeaderAction;
