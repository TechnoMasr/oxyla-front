import { AnimatePresence, motion } from "framer-motion";

import logo1 from "../../assets/images/oxela-home-logo/1.png";
import logo2 from "../../assets/images/oxela-home-logo/2.png";
import logo3 from "../../assets/images/oxela-home-logo/3.png";
import logo4 from "../../assets/images/oxela-home-logo/4.png";
import logo5 from "../../assets/images/oxela-home-logo/5.png";
import { useEffect } from "react";

const HomeLoader = ({ show, onFinish }) => {
  const logos = [logo1, logo2, logo3, logo4];
  const text = "Breath . Renew . Heal";

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        onFinish();
      }, 5000);
    }
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[1111] bg-white flex flex-col items-center justify-center gap-2"
        >
          <motion.div
            initial={{ x: "40%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 2.5,
              delay: 0.5,
            }}
            className="h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] relative overflow-hidden"
          >
            <img
              src={logo5}
              alt="logo"
              className="w-full absolute top-0 left-0 bg-white z-0"
            />

            {logos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt="logo"
                className={`w-full absolute top-0 left-0 bg-white z-${
                  50 - index * 10
                }`}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: index === 0 ? 0.5 : (index + 1) * 0.5,
                }}
              />
            ))}
          </motion.div>

          <h3 className="text-lg lg:text-2xl font-medium tracking-wide flex">
            {Array.from(text).map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 2.5 + index * 0.1,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h3>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default HomeLoader;
