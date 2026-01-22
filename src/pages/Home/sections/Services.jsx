import AnimatedSentence from "./AnimatedSentence";

const Services = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg lg:text-2xl uppercase">
          {data?.home_section2_title}
        </h2>

        <AnimatedSentence text={data?.home_section2_description} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {data?.cards.map((item, index) => (
            <div
              key={index}
              className="bg-white text-center p-6 rounded-xl shadow-lg"
            >
              <h3 className="font-bold text-xl mb-2 uppercase">{item.title}</h3>
              <p className="text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
