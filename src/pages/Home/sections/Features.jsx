const Features = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding container">
      <hgroup className="flex flex-wrap justify-between gap-4 mb-6 lg:mb-12">
        <h2 className="text-2xl font-bold uppercase">
          {data?.titles?.home_section3_title}
        </h2>
        <p className="max-w-lg uppercase">
          {data?.titles?.home_section3_description}
        </p>
      </hgroup>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data.map((feature) => (
          <li
            key={feature.id}
            className="flex flex-col items-center text-center lg:items-start lg:text-start gap-4 bg-gray-100 p-4 rounded-xl shadow-lg"
          >
            {feature.icon && (
              <img
                loading="lazy"
                src={feature.icon}
                alt={feature.description}
                className="w-10 h-10 object-contain"
              />
            )}
            <p className="font-semibold uppercase text-lg">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
