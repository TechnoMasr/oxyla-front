const Services = () => {
  const list = [
    {
      id: 1,
      title: "Pure Oxygen Environments",
      description: "Controlled, concentrated oxygen for deep cellular ",
    },
    {
      id: 2,
      title: "Designed for Comfort",
      description: "Modern, peaceful rooms crafted to relax body and mind.",
    },
    {
      id: 3,
      title: "Guided Healing",
      description:
        "Professional supervision for a safe, rejuvenating experience.",
    },
  ];

  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg">
          Reviving Wellness Through the Power of Oxygen.
        </h2>

        <p className="text-stone-400 font-bold text-xl lg:text-3xl leading-snug max-w-4xl">
          <span className="text-black">At Oxyla,</span> we believe healing
          begins with every breath. Our spaces combine medical-grade oxygen
          technology with a calming atmosphere to accelerate physical recovery,
          boost energy, and restore mental clarity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {list.map((item) => (
            <div
              key={item.id}
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
