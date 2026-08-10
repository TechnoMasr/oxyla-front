import { TbLogout2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modals/modalsSlice";

const ProfileSideBar = ({ isOpen, handleClose, links }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 z-[100] lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-26 start-0 h-full w-64 bg-white border-e border-gray-200 z-[101] lg:z-0 transform transition-transform duration-300
        ${isOpen ? "translate-x-0 rtl:-translate-x-0" : "-translate-x-full rtl:translate-x-full"} lg:translate-x-0 rtl:lg:translate-x-0`}
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
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={`${item.url}`}
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

          <button
            onClick={() => {
              dispatch(openModal("logoutModal"));
            }}
            className={`flex gap-3 px-3 py-2 rounded-md transition items-center bg-red-700/80 text-white cursor-pointer`}
          >
            <span className="text-xl">
              {<TbLogout2 className="rtl:rotate-180" />}
            </span>
            <p className="capitalize">{t("profileSideBar.logout")}</p>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default ProfileSideBar;
