import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileSideBar from "./sections/ProfileSideBar";
import { useTranslation } from "react-i18next";
import { HiMenuAlt2 } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { PiCalendarMinus } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  const { pathname } = useLocation();
  const { t } = useTranslation();

  const profileLinks = [
    {
      name: t("profileSideBar.editProfile"),
      url: "/profile",
      icon: <RiEdit2Line />,
    },
    {
      name: t("profileSideBar.notifications"),
      url: "/profile/notifications",
      icon: <BsBell />,
    },
    {
      name: t("profileSideBar.appointment"),
      url: "/profile/appointment",
      icon: <PiCalendarMinus />,
    },
    {
      name: t("profileSideBar.wishlist"),
      url: "/profile/wishlist",
      icon: <FiHeart />,
    },
  ];

  return (
    <section className="container pagePadding">
      <div className="flex h-full">
        <ProfileSideBar
          isOpen={isOpen}
          handleClose={handleClose}
          links={profileLinks}
        />

        <main className="flex-1 md:p-6 w-full overflow-hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggle}
              className="lg:hidden bg-myPurple text-white text-xl p-1 rounded shadow-lg cursor-pointer"
            >
              <HiMenuAlt2 />
            </button>
            <h2 className="text-2xl font-bold text-myPurple">
              {profileLinks.find((link) => link.url === pathname)?.name}
            </h2>
          </div>

          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Profile;
