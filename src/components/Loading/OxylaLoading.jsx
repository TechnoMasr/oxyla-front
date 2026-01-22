import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo/logo.png";
import { useLocation } from "react-router-dom";

const OxylaLoading = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [logoSize, setLogoSize] = useState(120);
  const [bubbles, setBubbles] = useState([]);
  const { pathname } = useLocation();

  // إنشاء bubbles عشوائية
  useEffect(() => {
    const numBubbles = 35;
    const logoRadius = logoSize / 2 + 60;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newBubbles = [];

    while (newBubbles.length < numBubbles) {
      const size = Math.random() * 50 + 15;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance > logoRadius) {
        newBubbles.push({
          id: Math.random(),
          size,
          x,
          y,
          startZ: -800 - Math.random() * 400, // بعيدة جدًا
          endZ: Math.random() * 200 - 100, // قريبة
          dx: (Math.random() - 0.5) * 100,
          dy: (Math.random() - 0.5) * 100,
          floatDuration: Math.random() * 6 + 5,
          delay: Math.random() * 1.8, // دخول واحدة واحدة
        });
      }
    }

    setBubbles(newBubbles);
  }, [logoSize]);

  useEffect(() => {
    setVisible(true);
  }, [pathname]);

  useEffect(() => {
    const updateLogoSize = () => {
      const width = window.innerWidth;
      if (width < 640) setLogoSize(120);
      else if (width < 1024) setLogoSize(150);
      else setLogoSize(200);
    };
    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);
    return () => window.removeEventListener("resize", updateLogoSize);
  }, []);

  useEffect(() => {
    let start = null;
    const duration = 4000; // ممكن أقل شوية

    setProgress(0);
    setVisible(true);

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const value = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(value));

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setVisible(false), 400);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      start = null;
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence onExitComplete={() => setVisible(false)}>
        {visible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white z-[9999] overflow-hidden"
            style={{
              perspective: "1400px",
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Bubbles */}
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                className="absolute rounded-full"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: bubble.x,
                  top: bubble.y,
                  background:
                    "radial-gradient(circle at 30% 30%, #ffffffdd, var(--color-myPurple))",
                  boxShadow: "0 25px 45px rgba(0,0,0,0.3)",
                  transformStyle: "preserve-3d",
                }}
                /* 1️⃣ من العمق */
                initial={{
                  z: bubble.startZ,
                  scale: 0.2,
                  opacity: 0,
                  filter: "blur(8px)",
                }}
                /* 2️⃣ دخول + قرب */
                animate={{
                  z: bubble.endZ,
                  scale: 1,
                  opacity: 0.65,
                  filter: "blur(0px)",
                  x: [0, bubble.dx, -bubble.dx, 0],
                  y: [0, bubble.dy, -bubble.dy, 0],
                }}
                transition={{
                  z: { duration: 3, ease: "easeOut", delay: bubble.delay },
                  scale: { duration: 2.5, delay: bubble.delay },
                  opacity: { duration: 2, delay: bubble.delay },
                  filter: { duration: 2, delay: bubble.delay },
                  duration: bubble.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, type: "spring" }}
            >
              <motion.div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full border-2 lg:border-4 border-dashed border-myBlue" />

              <motion.div
                className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              >
                {["left", "right"].map((side) => (
                  <div
                    key={side}
                    className={`absolute top-1/2 ${
                      side === "left"
                        ? " left-1/2 -translate-x-[180px] lg:-translate-x-[280px]"
                        : "right-1/2 translate-x-[180px] lg:translate-x-[280px]"
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
              animate={{ scale: [1, 1.2, 1], opacity: 1 }} // opacity ثابت بعد الظهور
              transition={{
                scale: { duration: 1.5, ease: "easeInOut", repeat: Infinity },
                opacity: { duration: 1, ease: "easeOut" },
              }}
            >
              <img
                loading="lazy"
                src={logo}
                alt="logo"
                style={{ width: logoSize }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
};

export default OxylaLoading;
