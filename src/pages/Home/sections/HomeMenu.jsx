import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const HomeMenu = ({ openMenu, setOpenMenu }) => {
  const { t } = useTranslation();

  const Links = [
    { id: 1, title: t("HomeMenu.links.home"), link: "/" },
    { id: 2, title: t("HomeMenu.links.about"), link: "/about-us" },
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
          className="fixed inset-0 h-screen w-screen bg-black/50 z-30 flex justify-end"
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
              style={{ transformOrigin: "top right" }}
              className="bg-white w-full h-full p-4 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <span
                onClick={onClose}
                className="absolute top-4 end-4 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <IoClose />
              </span>

              <nav className="w-full flex flex-col items-center justify-center gap-4">
                {Links.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + link.id * 0.05 }}
                  >
                    <Link
                      className="text-xl font-semibold capitalize hover:text-myBlue"
                      to={link.link}
                      onClick={onClose}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default HomeMenu;
