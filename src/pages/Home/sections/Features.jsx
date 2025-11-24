import waterdropIcon from "../../../assets/icons/Waterdrop.png";
import meditationIcon from "../../../assets/icons/Meditation.png";
import boltIcon from "../../../assets/icons/Bolt.png";
import walkingIcon from "../../../assets/icons/Walking Round.png";
import handIcon from "../../../assets/icons/Hand Stars.png";
import bedIcon from "../../../assets/icons/Bed.png";

const Features = () => {
  const listFeatures = [
    { id: 1, title: "Detoxifies your body naturally", icon: waterdropIcon },
    { id: 2, title: "Relieves stress and anxiety", icon: meditationIcon },
    { id: 3, title: "Boosts focus and energy", icon: boltIcon },
    { id: 4, title: "Accelerates physical recovery", icon: walkingIcon },
    { id: 5, title: "Enhances skin health and glow", icon: handIcon },
    { id: 6, title: "Improves sleep quality", icon: bedIcon },
  ];

  return (
    <section className="sectionPadding container">
      <hgroup className="flex flex-wrap justify-between gap-4 mb-6 lg:mb-12">
        <h2 className="text-lg font-bold">The Benefits of Breathing Better.</h2>
        <p className="text-sm max-w-lg">
          Our oxygen therapy blends relaxation and medical science — helping you
          feel lighter, clearer, and more in tune with your body.
        </p>
      </hgroup>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {listFeatures.map((feature) => (
          <li
            key={feature.id}
            className="space-y-4 bg-gray-100 p-4 rounded-xl shadow-lg"
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="w-8 h-8 object-contain"
            />
            <p className="font-semibold">{feature.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
