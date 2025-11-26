const Services = ({ data }) => {
  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg">{data?.home_section2_title}</h2>

        <p className="text-stone-500 font-bold text-xl lg:text-3xl leading-snug max-w-4xl">
          {data?.home_section2_description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {data?.cards.map((item, index) => (
            <div
              key={index}
              className="bg-white text-center p-6 rounded-xl shadow-lg"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
