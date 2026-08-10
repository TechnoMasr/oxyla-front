import { NavLink } from "react-router-dom";

const NavBarMobile = ({ activeNav, setActiveNav, links }) => {
  return (
    <nav
      className={`flex lg:hidden flex-col gap-1.5 w-full overflow-hidden
      transition-all duration-500 ease-in-out ${
        activeNav ? "max-h-96 pt-3 pb-2" : "max-h-0"
      }`}
    >
      {links.map((link) => (
        <NavLink
          to={link.path}
          key={link.name}
          className="navLinkMobile"
          onClick={() => {
            if (setActiveNav) setActiveNav(false);
          }}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBarMobile;
