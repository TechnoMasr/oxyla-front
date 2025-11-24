import img from "../../../assets/images/book-img.jpg";

const FAQS = () => {
  const faqs = [
    {
      question: "What is oxygen therapy?",
      answer:
        "Oxygen therapy is a treatment that involves breathing in pure oxygen to improve oxygen levels in the body, which can enhance overall health and well-being.",
    },
    {
      question: "How does oxygen therapy help?",
      answer:
        "Oxygen therapy can help improve blood oxygen levels, reduce inflammation, and reduce the risk of cardiovascular disease, diabetes, and other health conditions.",
    },
    {
      question: "Is oxygen therapy safe?",
      answer:
        "Yes, oxygen therapy is generally safe when administered under the guidance of a healthcare professional. It is important to follow the recommended dosage and duration of treatment.",
    },
    {
      question: "How often should I undergo oxygen therapy?",
      answer:
        "The frequency of oxygen therapy sessions can vary depending on individual health needs and goals. It is best to consult with a healthcare provider to determine the appropriate schedule for you.",
    },
  ];

  return (
    <section className="sectionPadding container">
      <h2 className="font-bold text-lg mb-6 lg:mb-12">
        Select the Room That Matches Your Healing Journey.
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Image section */}
        <div className="hidden lg:block w-full aspect-square rounded-xl shadow-lg overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Accordion section */}
        <div className="space-y-4 lg:col-span-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-arrow bg-base-200 rounded-xl shadow-lg"
            >
              <div className="collapse-title text-lg font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQS;
