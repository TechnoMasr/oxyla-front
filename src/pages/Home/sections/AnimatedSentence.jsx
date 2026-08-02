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
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // 1. هنا بنحول الـ HTML String لنص سادة تماماً وبنصلح الرموز
  const getPlainText = (htmlString) => {
    if (!htmlString) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || doc.body.innerText || "";
  };

  const plainText = getPlainText(text);

  // 2. بنقسم النص السادة لكلمات بناءً على المسافات
  const words = plainText.split(/\s+/).filter(Boolean);

  return (
    <p
      ref={ref}
      // أضفنا text-right علشان النص عندك متنسق في الـ HTML الأصلي إنه text-align:end
      className="font-bold text-2xl lg:text-4xl leading-snug flex flex-wrap gap-x-2 gap-y-1 justify-start"
    >
      {words.map((word, index) => (
        <span
          key={index}
          className={`transition-colors duration-500 ${
            isVisible ? "text-black" : "text-stone-400"
          }`}
          style={{ transitionDelay: `${index * 50}ms` }} // قللت الـ delay لـ 50ms عشان النص طويل ومياخدش وقت كبير
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default AnimatedSentence;
