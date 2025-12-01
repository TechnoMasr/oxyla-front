import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedSentence = ({ text }) => {
  const words = text ? text.split(" ") : [];
  const wordRefs = useRef([]);

  // Single animation controller for all words
  const controls = useAnimation();

  useEffect(() => {
    wordRefs.current.forEach((word) => {
      if (!word) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start({ color: "#000000", transition: { duration: 1 } });
          } else {
            controls.start({ color: "#8d8d8d", transition: { duration: 1 } });
          }
        },
        { threshold: 0.7 }
      );

      observer.observe(word);

      return () => observer.disconnect();
    });
  }, [words, controls]);

  return (
    <p className="font-bold text-2xl lg:text-4xl leading-snug flex flex-wrap gap-2">
      {words.map((word, index) => (
        <motion.span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          animate={controls}
          initial={{ color: "#8d8d8d" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default AnimatedSentence;
