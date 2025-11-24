import img from "../../../assets/images/book-img.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const Rooms = () => {
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
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg">
          Select the Room That Matches Your Healing Journey.
        </h2>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            560: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {list?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 text-sm">
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="w-full h-48 overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
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
