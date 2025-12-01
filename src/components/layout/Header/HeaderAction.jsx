import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { PiCalendarMinus } from "react-icons/pi";
import { RiEdit2Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { MdLogin } from "react-icons/md";
import LanguageSwitcher from "../../common/LanguageSwitcher";

const HeaderAction = ({ setActiveNav }) => {
  const { profile } = useSelector((state) => state.profile);

  const profileList = [
    { name: "edit profile", url: "", icon: <RiEdit2Line /> },
    { name: "notifications", url: "notifications", icon: <BsBell /> },
    { name: "appointment", url: "appointment", icon: <PiCalendarMinus /> },
    { name: "wishlist", url: "wishlist", icon: <FiHeart /> },
    { name: "logout", url: "logout", icon: <TbLogout2 /> },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2">
      <LanguageSwitcher />

      {profile ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="cursor-pointer text-2xl text-myPurple">
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
          </ul>
        </div>
      ) : (
        <Link
          to="/signin"
          className="text-2xl text-myPurple cursor-pointer"
          onClick={() => setActiveNav(false)}
        >
          <MdLogin />
        </Link>
      )}

      <Link
        to="/cart"
        className="text-2xl text-myPurple cursor-pointer"
        onClick={() => setActiveNav(false)}
      >
        <IoCartOutline />
      </Link>
    </div>
  );
};

export default HeaderAction;
