import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = ({ data }) => {
  // تتبع الـ id الخاص بالسؤال المفتوح حالياً (null يعني الكل مغلق)
  const [activeId, setActiveId] = useState(null);

  if (!data || !data.data || data.data.length === 0) return null;

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="sectionPadding container">
      <h2 className="text-2xl font-bold uppercase mb-6 lg:mb-12">
        {data?.titles}
      </h2>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Image section */}
        <div className="hidden lg:block w-full aspect-square rounded-xl shadow-lg overflow-hidden lg:col-span-5">
          {data?.image && (
            <img
              loading="lazy"
              src={data?.image}
              alt={data?.titles}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Accordion section */}
        <div className="space-y-4 lg:col-span-7">
          {data.data.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-base-200 rounded-xl shadow-lg overflow-hidden border border-base-300"
              >
                {/* العنوان / زر الضغط */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold transition-colors duration-200 hover:bg-base-300/50 cursor-pointer"
                >
                  <span>{faq.question}</span>

                  {/* سهم متحرك بديل لـ daisy ui */}
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-5 h-5 stroke-current shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                {/* المحتوى المتحرك */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 text-sm text-stone-700 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQS;
