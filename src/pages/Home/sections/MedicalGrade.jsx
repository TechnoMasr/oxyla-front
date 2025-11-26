const MedicalGrade = ({ data }) => {
  return (
    <section className="sectionPadding container">
      <hgroup className="flex flex-wrap justify-between gap-4 mb-6 lg:mb-12">
        <h2 className="text-lg font-bold">
          {data?.titles?.home_section4_title}
        </h2>
        <p className="text-sm max-w-lg">
          {data?.titles?.home_section4_description}
        </p>
      </hgroup>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data?.data.map((feature) => (
          <li
            key={feature.id}
            className="space-y-4 p-4 border-b-2 border-gray-200"
          >
            <div className="w-full lg:max-w-sm h-60 overflow-hidden rounded-xl bg-gray-100">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MedicalGrade;
