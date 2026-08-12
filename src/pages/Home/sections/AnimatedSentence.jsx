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

  const renderAnimatedHTML = (htmlString) => {
    if (!htmlString) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    let wordCounter = 0;

    // parentStyle: الستايل الموروث من العناصر الأب (strong / span data-color..)
    const parseNode = (node, key = "0", parentStyle = {}) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent;
        if (!textContent.trim()) return textContent;

        const words = textContent.split(/(\s+)/);

        return words.map((part, idx) => {
          if (/\s+/.test(part)) return part;

          const currentIndex = wordCounter++;
          return (
            <span
              key={`${key}-${idx}`}
              className="inline-block transition-colors duration-500"
              style={{
                ...parentStyle,
                fontWeight: parentStyle.fontWeight ?? 400,
                color: isVisible
                  ? (parentStyle.color ?? "var(--color, inherit)")
                  : "#a8a29e",
                transitionDelay: `${currentIndex * 50}ms`,
              }}
            >
              {part}
            </span>
          );
        });
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const attributes = {};
        const styleObj = {};

        Array.from(node.attributes).forEach((attr) => {
          if (attr.name === "class") {
            attributes.className = attr.value;
          } else if (attr.name === "style") {
            attr.value.split(";").forEach((rule) => {
              const idx = rule.indexOf(":");
              if (idx === -1) return;
              const prop = rule.slice(0, idx).trim();
              const val = rule.slice(idx + 1).trim();
              if (prop && val) styleObj[prop] = val;
            });
          } else {
            attributes[attr.name] = attr.value;
          }
        });

        // نبني الستايل اللي هيتوارث للأولاد: بتاع الأب + بتاع العنصر ده
        const tag = node.tagName.toLowerCase();
        const nextParentStyle = { ...parentStyle, ...styleObj };
        if (tag === "strong" || tag === "b") {
          nextParentStyle.fontWeight = "bold";
        }
        if (tag === "em" || tag === "i") {
          nextParentStyle.fontStyle = "italic";
        }

        const children = Array.from(node.childNodes).map((child, idx) =>
          parseNode(child, `${key}-${idx}`, nextParentStyle),
        );

        const TagName = tag;
        return (
          <TagName key={key} {...attributes} style={styleObj}>
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
    <div ref={ref} className="text-2xl lg:text-4xl leading-snug rich_content">
      {renderAnimatedHTML(text)}
    </div>
  );
};

export default AnimatedSentence;
