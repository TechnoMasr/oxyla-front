import { NavLink } from "react-router-dom";

const NavBarMobile = ({ activeNav, setOpenLinks, links }) => {
  return (
    <nav
      className={`flex lg:hidden flex-col gap-2 w-full overflow-hidden transition-all duration-500 ease-in-out ${
        activeNav ? "max-h-screen py-2" : "max-h-0"
      }`}
    >
      {links.map((link) => (
        <NavLink
          to={link.path}
          key={link.name}
          className="navLinkMobile"
          onClick={() => {
            setOpenLinks(null);
          }}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBarMobile;
