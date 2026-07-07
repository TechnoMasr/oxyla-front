import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/oxela-home-logo/5.png";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../../services/mainServices";
import { useSelector } from "react-redux";

const Footer = () => {
  const { t } = useTranslation();

  const { setting } = useSelector((state) => state.setting);

  const { data: page } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  const dynamicPages =
    page?.length === 0
      ? [{ name: t("Footer.about"), url: "/about-us" }]
      : page?.map((item) => ({
          name: item.name,
          url: `/pages/${item.slug}`,
        })) || [];

  const pageLinks = [
    { name: t("Footer.home"), url: "/" },
    { name: t("Footer.rooms"), url: "/services" },
    { name: t("Footer.booking"), url: "/services" },
    { name: t("Footer.contact"), url: "/contact-us" },
    ...dynamicPages,
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: setting?.facebook },
    { icon: <FaYoutube />, url: setting?.youtube },
    { icon: <FaInstagram />, url: setting?.instagram },
    { icon: <FaLinkedin />, url: setting?.linkedin },
  ];

  return (
    <footer className="container sectionPadding">
      {/* القسم الرئيسي العلوي */}
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
          {socialLinks
            .filter((link) => link.url)
            .map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-myBlue duration-200"
                >
                  {link.icon}
                </a>
              </li>
            ))}
        </ul>
      </div>

      {/* --- القسم الجديد: السجل التجاري والرقم الضريبي --- */}
      {(setting?.commercial_registration_no || setting?.tax_no) && (
        <div className="mt-6 pt-4 border-t border-gray-300 text-center text-sm flex flex-wrap justify-center gap-x-6 gap-y-2">
          {setting?.commercial_registration_no && (
            <div>
              <span className="font-semibold text-gray-600">
                {t("Footer.cr")}:{" "}
              </span>
              <span className="">{setting.commercial_registration_no}</span>
            </div>
          )}
          {setting?.tax_no && (
            <div>
              <span className="font-semibold text-gray-600">
                {t("Footer.tax")}:{" "}
              </span>
              <span className="">{setting.tax_no}</span>
            </div>
          )}
        </div>
      )}
    </footer>
  );
};

export default Footer;
