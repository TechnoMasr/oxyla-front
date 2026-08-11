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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // معالجة الـ HTML مع الحفاظ على الألوان والـ Custom Properties
  const renderAnimatedHTML = (htmlString) => {
    if (!htmlString) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    let wordCounter = 0;

    const parseNode = (node, key = "0") => {
      // 1. معالجة النصوص وتقسيمها لكلمات
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent;
        if (!textContent.trim()) return textContent;

        const words = textContent.split(/(\s+)/); // الاحتفاظ بالمسافات

        return words.map((part, idx) => {
          if (/\s+/.test(part)) return part;

          const currentIndex = wordCounter++;
          return (
            <span
              key={`${key}-${idx}`}
              className="inline-block transition-colors duration-500"
              style={{
                color: isVisible ? "var(--color, inherit)" : "#a8a29e", // #a8a29e يعادل text-stone-400
                transitionDelay: `${currentIndex * 50}ms`,
              }}
            >
              {part}
            </span>
          );
        });
      }

      // 2. معالجة الـ HTML Elements وإعادة إنشائها
      if (node.nodeType === Node.ELEMENT_NODE) {
        const children = Array.from(node.childNodes).map((child, idx) =>
          parseNode(child, `${key}-${idx}`),
        );

        const attributes = {};
        Array.from(node.attributes).forEach((attr) => {
          if (attr.name === "class") {
            attributes.className = attr.value;
          } else if (attr.name === "style") {
            // تحويل ستايل الـ Inline CSS إلى Object يفهمه React
            const styleObj = {};
            attr.value.split(";").forEach((rule) => {
              const [prop, val] = rule.split(":");
              if (prop && val) {
                styleObj[prop.trim()] = val.trim();
              }
            });
            attributes.style = styleObj;
          } else {
            attributes[attr.name] = attr.value;
          }
        });

        const TagName = node.tagName.toLowerCase();
        return (
          <TagName key={key} {...attributes}>
            {children}
          </TagName>
        );
      }

      return null;
    };

    return Array.from(doc.body.childNodes).map((child, idx) =>
      parseNode(child, `node-${idx}`),
    );
  };

  return (
    <div
      ref={ref}
      className="font-bold text-2xl lg:text-4xl leading-snug rich_content"
    >
      {renderAnimatedHTML(text)}
    </div>
  );
};

export default AnimatedSentence;
