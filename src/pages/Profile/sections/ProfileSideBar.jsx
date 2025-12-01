import { BsBell } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { PiCalendarMinus } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileSideBar = ({ isOpen, handleClose }) => {
  const { t } = useTranslation();

  const profileList = [
    { name: t("profileSideBar.editProfile"), url: "", icon: <RiEdit2Line /> },
    {
      name: t("profileSideBar.notifications"),
      url: "notifications",
      icon: <BsBell />,
    },
    {
      name: t("profileSideBar.appointment"),
      url: "appointment",
      icon: <PiCalendarMinus />,
    },
    { name: t("profileSideBar.wishlist"), url: "wishlist", icon: <FiHeart /> },
    { name: t("profileSideBar.logout"), url: "logout", icon: <TbLogout2 /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 z-[100] lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-e border-gray-200 z-[101] lg:z-0 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b mb-4 border-gray-200">
          <h3 className="text-xl font-bold text-myPurple">
            {t("profileSideBar.title")}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-600 text-2xl cursor-pointer lg:hidden"
          >
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {profileList.map((item) => (
            <NavLink
              key={item.name}
              to={`/profile/${item.url}`}
              end
              onClick={handleClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-myPurple text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <p className="capitalize">{item.name}</p>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default ProfileSideBar;
