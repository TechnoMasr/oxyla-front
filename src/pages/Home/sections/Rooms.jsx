import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Rooms = ({ data }) => {
  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg">{data?.title}</h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            560: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {data?.data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 text-sm">
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="w-full h-48 overflow-hidden rounded-xl">
                  <img
                    src={item.main_image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center">
          <Link
            to="/"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            Explore More Rooms <GoArrowUpRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
