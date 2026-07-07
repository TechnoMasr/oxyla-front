import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const HeroCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 5 + index * 0.5 }}
      className="overflow-hidden group relative"
    >
      <img
        loading="lazy"
        src={item?.mobile_image}
        alt={item?.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 md:hidden"
      />

      <img
        loading="lazy"
        src={item?.web_image}
        alt={item?.title}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hidden md:block"
      />

      <div
        className="absolute -bottom-16 left-0 w-full bg-black/0 backdrop-blur-none 
        group-hover:backdrop-blur-xl group-hover:bottom-0 group-hover:bg-black/20
        transition-all duration-500 flex flex-col justify-center items-center text-center p-4"
      >
        <h2 className="text-4xl font-bold text-white mb-2">{item?.title}</h2>
        <p className="text-white mb-4">{item?.description}</p>

        <Link
          to={item?.button_url || "/services"}
          className="px-4 py-2 text-xl text-white border font-semibold rounded flex items-center gap-2"
        >
          {item?.button_text} <GoArrowUpRight className=" rtl:rotate-270" />
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroCard;
