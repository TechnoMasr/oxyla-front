const FAQS = ({ data }) => {
  return (
    <section className="sectionPadding container">
      <h2 className="text-2xl font-bold uppercase mb-6 lg:mb-12">
        {data?.titles}
      </h2>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Image section */}
        <div className="hidden lg:block w-full aspect-square rounded-xl shadow-lg overflow-hidden lg:col-span-5">
          <img
            src={data?.image}
            alt={data?.titles}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Accordion section */}
        <div className="space-y-4 lg:col-span-7">
          {data?.data.map((faq) => (
            <div
              key={faq.id}
              tabIndex={0}
              className="collapse collapse-arrow bg-base-200 rounded-xl shadow-lg"
            >
              <div className="collapse-title text-lg font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content text-sm text-stone-700 font-medium">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQS;
