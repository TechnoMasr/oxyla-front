import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo/logo.png";

const PagesLoading = ({ show, onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(show);
  const [logoSize, setLogoSize] = useState(120);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  useEffect(() => {
    const updateLogoSize = () => {
      const width = window.innerWidth;
      if (width < 640) setLogoSize(100);
      else if (width < 768) setLogoSize(150);
      else if (width < 1024) setLogoSize(200);
      else setLogoSize(250);
    };
    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);
    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);

  useEffect(() => {
    let start = null;
    const duration = 3000; // ← المدة الجديدة 3 ثواني

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(progressValue));

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        // بعد انتهاء التحميل
        setTimeout(() => setVisible(false), 300); // يفضل تسيبه 300ms عشان exit animation
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={onFinish} // ⬅️ هنا نستدعي onFinish بعد الأنميشن فعليًا
    >
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-white z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <motion.div className="w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full border-2 lg:border-4 border-dashed border-myBlue" />

            <motion.div
              className="absolute w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            >
              {["left", "right"].map((side) => (
                <div
                  key={side}
                  className={`absolute top-1/2 ${
                    side === "left"
                      ? " left-1/2 -translate-x-[170px] lg:-translate-x-[325px]"
                      : "right-1/2 translate-x-[170px] lg:translate-x-[325px]"
                  } -translate-y-1/2`}
                >
                  <motion.div
                    className="relative text-myBlue text-2xl lg:text-3xl font-bold flex items-center justify-center"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 5,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.5)] backdrop-blur-sm"
                      style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                    ></span>
                    <span className="relative z-10">{progress}%</span>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          >
            <img src={logo} alt="logo" style={{ width: logoSize }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PagesLoading;
