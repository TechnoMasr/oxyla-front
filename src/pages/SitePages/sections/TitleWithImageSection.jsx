import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const TitleWithImageSection = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useSelector((state) => state.language);

  return (
    <section className="sectionPadding w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-16">
      <article className="md:col-span-3">
        <h2 className="text-3xl lg:text-5xl font-semibold w-full max-w-lg mb-8">
          {data?.title}
        </h2>

        <div>
          <div className="flex flex-col mb-4 relative">
            <div className="flex items-center justify-around gap-4 relative">
              {data?.items.map((item, index) => (
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
                  width: `${100 / data?.items.length}%`,
                  [lang === "ar" ? "right" : "left"]: `${
                    (100 / data?.items.length) * currentIndex
                  }%`,
                }}
              />
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: data?.items[currentIndex].description,
            }}
          />
        </div>
      </article>

      <div className="md:col-span-2 aspect-square mb-2 rounded-2xl overflow-hidden relative hidden md:block">
        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white !opacity-60",
            bulletActiveClass: "!opacity-100",
          }}
          className="w-full h-full"
        >
          {data?.images_full_path.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                loading="lazy"
                src={img}
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

export default TitleWithImageSection;
