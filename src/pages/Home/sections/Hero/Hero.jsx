import HeroCard from "./HeroCard";

const Hero = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="h-[100svh] w-full relative">
      <div className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-3">
        {data?.map((item, index) => (
          <HeroCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
