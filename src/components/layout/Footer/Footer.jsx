import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/oxela-home-logo/5.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const pageLinks = [
    { name: t("Footer.home"), url: "/" },
    { name: t("Footer.about"), url: "/about-us" },
    { name: t("Footer.rooms"), url: "/services" },
    { name: t("Footer.booking"), url: "/services" },
    { name: t("Footer.contact"), url: "/contact-us" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "/" },
    { icon: <FaYoutube />, url: "/" },
    { icon: <FaInstagram />, url: "/" },
    { icon: <FaLinkedin />, url: "/" },
  ];

  return (
    <footer className="container sectionPadding">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <img loading="lazy" src={logo} alt="Logo" className="w-32" />

        <ul className="flex flex-wrap justify-center gap-4">
          {pageLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.url}
                className="text-sm font-medium hover:text-myBlue duration-200 capitalize"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                className="text-xl hover:text-myBlue duration-200"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
