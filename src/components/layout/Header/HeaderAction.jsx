import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { PiCalendarMinus } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { openModal } from "../../../store/modals/modalsSlice";
import Avatar from "../../common/Avatar";

const HeaderAction = ({ setActiveNav }) => {
  const { t } = useTranslation();
  const { profile, cartCount } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // دالة لإلغاء الـ Focus وإغلاق الـ Dropdown فوراً
  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const profileList = [
    {
      name: t("headerActions.editProfile"),
      url: "",
      icon: <RiEdit2Line size={20} />,
    },
    {
      name: t("headerActions.notifications"),
      url: "notifications",
      icon: <BsBell size={20} />,
    },
    {
      name: t("headerActions.appointment"),
      url: "appointment",
      icon: <PiCalendarMinus size={20} />,
    },
    {
      name: t("headerActions.wishlist"),
      url: "wishlist",
      icon: <FiHeart size={20} />,
    },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      <LanguageSwitcher />

      {profile ? (
        <>
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

          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer text-3xl text-myPurple">
              <Avatar name={profile?.name} size="sm" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg"
            >
              <div className="flex gap-2 items-center mb-2 pb-2 border-b border-gray-300">
                <Avatar name={profile?.name} size="sm" />
                <p className="text-lg font-semibold flex-1 line-clamp-1">
                  {profile?.name}
                </p>
              </div>

              {profileList.map((item) => (
                <li key={item.name}>
                  <Link
                    to={`/profile/${item.url}`}
                    className="flex gap-2 items-center text-myPurple"
                    onClick={closeDropdown} // <-- قفل الدروب داون عند الضغط على أي لينك
                  >
                    {item.icon}
                    <p>{item.name}</p>
                  </Link>
                </li>
              ))}

              <li
                onClick={() => {
                  dispatch(openModal("logoutModal"));
                  closeDropdown(); // <-- قفل الدروب داون عند الضغط على زر الخروج
                }}
                className="mt-2 pt-2 border-t border-gray-300"
              >
                <button className="flex gap-2 items-center bg-red-700/80 text-white w-full">
                  <TbLogout2 size={20} />
                  <p>{t("headerActions.logout")}</p>
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <Link
          to="/signin"
          className="text-3xl text-myPurple cursor-pointer"
          onClick={() => setActiveNav(false)}
        >
          <TbLogin2
            title={t("headerActions.login")}
            className="rtl:rotate-180"
          />
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
