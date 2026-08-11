import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HeroCard from "./HeroCard";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Hero = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="h-svh w-full relative overflow-hidden">
      {/* --- Mobile View: Swiper Slider --- */}
      <div className="block md:hidden h-full w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full 
        [&_.swiper-pagination-bullet]:bg-white! 
          [&_.swiper-pagination-bullet]:opacity-50!
          [&_.swiper-pagination-bullet]:rounded-full!
          [&_.swiper-pagination-bullet]:w-3!
          [&_.swiper-pagination-bullet]:h-3!
        [&_.swiper-pagination-bullet-active]:bg-white! 
          [&_.swiper-pagination-bullet-active]:w-6!
          [&_.swiper-pagination-bullet-active]:opacity-100! 
          [&_.swiper-pagination-bullet]:transition-all!"
        >
          {data?.map((item, index) => (
            <SwiperSlide key={item.id} className="h-full w-full">
              <HeroCard item={item} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Desktop View: Grid --- */}
      <div className="hidden md:grid h-full w-full bg-white grid-cols-3">
        {data?.map((item, index) => (
          <HeroCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
