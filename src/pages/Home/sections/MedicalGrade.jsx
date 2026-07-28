const MedicalGrade = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding container">
      <hgroup className="flex flex-wrap justify-between gap-4 mb-6 lg:mb-12">
        <h2 className="text-2xl font-bold uppercase">
          {data?.titles?.home_section4_title}
        </h2>
        <p className="text-sm max-w-lg uppercase">
          {data?.titles?.home_section4_description}
        </p>
      </hgroup>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data?.data.map((feature) => (
          <li
            key={feature.id}
            className="flex flex-col sm:flex-row items-start gap-3 p-4 shadow-lg rounded-xl border border-gray-200"
          >
            <div className="w-full sm:w-32 aspect-square overflow-hidden rounded-xl bg-gray-100">
              {feature.image && (
                <img
                  loading="lazy"
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <h3 className="font-bold uppercase text-lg">
                {feature.title}
              </h3>
              {/* <p className="">{feature.description}</p> */}
              <div
                dangerouslySetInnerHTML={{ __html: feature.description }}
                className="rich_content"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MedicalGrade;

//  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//    {data?.data.map((feature) => (
//      <li
//        key={feature.id}
//        className="space-y-3 py-4 border-b-2 border-gray-200"
//      >
//        <div className="w-full lg:max-w-sm h-72 lg:h-96 overflow-hidden rounded-xl bg-gray-100">
//          {feature.image && (
//            <img
//              loading="lazy"
//              src={feature.image}
//              alt={feature.title}
//              className="w-full h-full object-cover"
//            />
//          )}
//        </div>
//        <h3 className="font-semibold uppercase text-lg">{feature.title}</h3>
//        <p className="">{feature.description}</p>
//      </li>
//    ))}
//  </ul>
