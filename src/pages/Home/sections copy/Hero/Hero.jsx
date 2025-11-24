import { delay, motion } from "framer-motion";
import HeroCard from "./HeroCard";
import HeroCardImg from "../../../../assets/images/book-img.jpg";
import HeroHeader from "./HeroHeader/HeroHeader";

const Hero = () => {
  const list = [
    {
      id: 1,
      title: "Heal.",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      path: "/",
      image: HeroCardImg,
    },
    {
      id: 2,
      title: "Renew.",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      path: "/",
      image: HeroCardImg,
    },
    {
      id: 3,
      title: "Breathe.",
      description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      path: "/",
      image: HeroCardImg,
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <section className="h-[100svh] w-full relative">
      <HeroHeader />

      <motion.dev
        variants={container}
        initial="hidden"
        animate="show"
        className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-3"
      >
        {list.map((item) => (
          <HeroCard key={item.id} item={item} />
        ))}
      </motion.dev>
    </section>
  );
};

export default Hero;
