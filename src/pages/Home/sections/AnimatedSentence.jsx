import { useEffect, useRef, useState } from "react";

const AnimatedSentence = ({ text }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className="font-bold text-2xl lg:text-4xl leading-snug flex flex-wrap gap-2"
    >
      {text?.split(" ").map((word, index) => (
        <span
          key={index}
          className={`transition-colors duration-500 ${
            isVisible ? "text-black" : "text-stone-400"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default AnimatedSentence;
