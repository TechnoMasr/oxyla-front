import { useState } from "react";
import Img from "../../../assets/images/book-img.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AboutBottomSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const list = [
    {
      id: 1,
      title: "Our Vision",
      paragraph:
        "To be the leading center in the Middle East providing hyperbaric oxygen therapy, giving everyone the opportunity for a healthier and more energetic life.",
    },
    {
      id: 2,
      title: "Our Mission",
      paragraph:
        "To provide a safe and comfortable environment for patients to receive oxygen therapy, ensuring their well-being and overall health.",
    },
  ];

  const images = [
    {
      id: 1,
      img: Img,
    },
    {
      id: 2,
      img: Img,
    },
    {
      id: 3,
      img: Img,
    },
    {
      id: 4,
      img: Img,
    },
  ];

  return (
    <section className="sectionPadding w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
      <article className="md:col-span-3">
        <h2 className="text-3xl lg:text-5xl font-semibold w-full max-w-lg mb-8">
          Our Journey Toward Excellence and{" "}
          <span className="text-myPurple">Care</span>
        </h2>

        <div>
          <div className="flex flex-col mb-4 relative">
            <div className="flex items-center justify-around gap-4 relative">
              {list.map((item, index) => (
                <button
                  key={item.id}
                  className={`relative pb-2 text-xl md:text-2xl font-semibold transition-colors duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "text-myPurple"
                      : "text-gray-500 hover:text-myPurple"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* 🔹 مؤشر التحرك تحت التبويب النشط */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200">
              <div
                className="absolute h-full bg-myPurple transition-all duration-500 ease-in-out"
                style={{
                  width: `${100 / list.length}%`,
                  left: `${(100 / list.length) * currentIndex}%`,
                }}
              />
            </div>
          </div>

          <p>{list[currentIndex].paragraph}</p>
        </div>
      </article>

      <div className="md:col-span-2 aspect-square mb-2 rounded-2xl overflow-hidden relative">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white !opacity-60",
            bulletActiveClass: "!opacity-100",
          }}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img.img}
                alt={`img-${i}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AboutBottomSection;
