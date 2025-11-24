import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const cardVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroCard = ({ item }) => {
  return (
    <motion.div
      variants={cardVariant}
      className="overflow-hidden group relative"
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />

      <div
        className="absolute -bottom-16 left-0 w-full bg-black/0 backdrop-blur-none 
        group-hover:backdrop-blur-xl group-hover:bottom-0 group-hover:bg-black/20
        transition-all duration-500 flex flex-col justify-center items-center text-center p-4"
      >
        <h2 className="text-4xl font-bold text-white mb-2">{item.title}</h2>
        <p className="text-white mb-4">{item.description}</p>

        <Link
          to={item.path}
          className="px-4 py-2 text-xl text-white border font-semibold rounded flex items-center gap-2"
        >
          Book Now <GoArrowUpRight />
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroCard;
