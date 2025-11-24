import img from "../../../assets/images/book-img.jpg";

const MedicalGrade = () => {
  const list = [
    {
      id: 1,
      title: "Room Card",
      description:
        "Accelerate muscle recovery and improve endurance with focused oxygen therapy.",
      image: img,
    },
    {
      id: 2,
      title: "Luxury Oxygen Suite",
      description:
        "For those who seek elegance, tranquility, and a deeper healing connection.",
      image: img,
    },
    {
      id: 3,
      title: "Luxury Oxygen Suite",
      description:
        "For those who seek elegance, tranquility, and a deeper healing connection.",
      image: img,
    },
    {
      id: 4,
      title: "Luxury Oxygen Suite",
      description:
        "For those who seek elegance, tranquility, and a deeper healing connection.",
      image: img,
    },
  ];

  return (
    <section className="sectionPadding container">
      <hgroup className="flex flex-wrap justify-between gap-4 mb-6 lg:mb-12">
        <h2 className="text-lg font-bold">
          Medical-Grade Oxygen Systems for Deep Healing.
        </h2>
        <p className="text-sm max-w-lg">
          Every Oxyla room operates with precision oxygen control to maintain
          the perfect environment for rejuvenation — ensuring a safe, effective,
          and soothing therapy experience.
        </p>
      </hgroup>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((feature) => (
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
