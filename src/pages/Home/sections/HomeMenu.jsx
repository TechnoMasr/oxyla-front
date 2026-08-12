import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Avatar from "../../../components/common/Avatar"; // أضف المسار الصحيح لمكون الـ Avatar

const HomeMenu = ({ openMenu, setOpenMenu }) => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { profile } = useSelector((state) => state.profile);

  // الروابط الأساسية فقط بدون الحساب
  const Links = [
    { id: 1, title: t("HomeMenu.links.home"), link: "/" },
    { id: 2, title: t("HomeMenu.links.about"), link: "/pages/about-us" },
    { id: 3, title: t("HomeMenu.links.rooms"), link: "/services" },
    { id: 4, title: t("HomeMenu.links.contact"), link: "/contact-us" },
  ];

  const onClose = () => {
    setOpenMenu(false);
  };

  return (
    <AnimatePresence>
      {openMenu && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 h-dvh w-screen bg-black/50 z-60 flex justify-end"
          onClick={onClose}
        >
          <div className="w-full sm:w-[400px] h-full">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0, borderEndStartRadius: "50%" }}
              animate={{
                scale: 1,
                borderEndStartRadius: "0%",
              }}
              exit={{ scale: 0, borderEndStartRadius: "50%" }}
              transition={{
                duration: 0.5,
                type: "spring",
                damping: 20,
                stiffness: 200,
              }}
              style={{
                transformOrigin: lang === "ar" ? "top left" : "top right",
              }}
              className="bg-white w-full h-full p-6 flex flex-col justify-between relative overflow-hidden"
            >
              {/* زر الإغلاق */}
              <span
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-2xl cursor-pointer w-10 h-10 flex items-center justify-center 
                rounded-full text-white bg-myGreen hover:brightness-110 transition"
              >
                <IoClose />
              </span>

              {/* الجزء العلوي: بيانات المستخدم عند وجود profile */}
              <div className="mt-12 flex items-center justify-center">
                {profile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Link
                      to="/profile"
                      onClick={onClose}
                      className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-gray-50 transition border border-myGreen shadow-xs"
                    >
                      <Avatar
                        name={profile?.name}
                        img={profile?.image}
                        size="md"
                      />
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-gray-800 text-lg truncate">
                          {profile?.name || t("Profile")}
                        </span>
                        <span className="text-sm text-gray-500">
                          {t("HomeMenu.viewProfile")}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* المنتصف: روابط القائمة */}
              <nav className="w-full flex flex-col items-center justify-center gap-5 my-auto">
                {Links.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + link.id * 0.05 }}
                  >
                    <Link
                      className="text-xl font-semibold capitalize hover:text-myBlue transition"
                      to={link.link}
                      onClick={onClose}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* الجزء السفلي: أزرار الدخول والتسجيل عند عدم وجود profile */}
              <div>
                {!profile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 w-full pt-4 border-t border-gray-100"
                  >
                    <Link
                      to="/signin"
                      onClick={onClose}
                      className="w-full mainBtn"
                    >
                      {t("HomeMenu.links.signin")}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={onClose}
                      className="w-full mainBtn light"
                    >
                      {t("HomeMenu.links.signup")}
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default HomeMenu;
