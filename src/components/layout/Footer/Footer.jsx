import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/oxela-home-logo/5.png";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../../services/mainServices";
import { useSelector } from "react-redux";
import appleIcon from "../../../assets/icons/apple.png";
import playstoreIcon from "../../../assets/icons/playstore.png";

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

  // مصفوفة السوشيال ميديا المحدثة بعد إضافة المنصات الناقصة
  const socialLinks = [
    { icon: <FaFacebook />, url: setting?.facebook },
    { icon: <FaYoutube />, url: setting?.youtube },
    { icon: <FaInstagram />, url: setting?.instagram },
    { icon: <FaLinkedin />, url: setting?.linkedin },
    { icon: <FaTiktok />, url: setting?.tiktok },
    { icon: <FaTwitter />, url: setting?.twitter },
    {
      icon: <FaWhatsapp />,
      url: setting?.whatsapp
        ? `https://wa.me/${setting.whatsapp.replace(/\s+/g, "")}`
        : "",
    },
  ];

  return (
    <footer className="container sectionPadding">
      {/* القسم الرئيسي العلوي */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <img
          loading="lazy"
          src={setting?.logo || logo}
          alt={t("Footer.logoAlt")}
          className="w-32"
        />

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

        {/* قائمة السوشيال ميديا */}
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

      {/* --- القسم الجديد: أزرار تحميل التطبيقات --- */}
      {(setting?.android_link || setting?.ios_link) && (
        <div className="mt-8 lg:mt-0 flex flex-wrap justify-center gap-4">
          {setting?.android_link && (
            <a
              href={setting.android_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-[1.5px] border-black text-black px-4 py-2 rounded-xl text-sm hover:brightness-95 duration-200"
            >
              <img src={playstoreIcon} alt="Google Play" className="w-7" />
              <div>
                <span className="block font-medium text-xs uppercase">
                  {t("Footer.downloadOn")}
                </span>
                <span className="font-bold">Google Play</span>
              </div>
            </a>
          )}
          {setting?.ios_link && (
            <a
              href={setting.ios_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-[1.5px] border-black text-black px-4 py-2 rounded-xl text-sm hover:brightness-95 duration-200"
            >
              <img src={appleIcon} alt="App Store" className="w-7" />
              <div>
                <span className="block font-medium text-xs uppercase">
                  {t("Footer.downloadOn")}
                </span>
                <span className="font-bold">App Store</span>
              </div>
            </a>
          )}
        </div>
      )}

      {/* --- قسم السجل التجاري والرقم الضريبي --- */}
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
