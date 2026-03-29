import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { renderStars } from "../../../utils/renderStars";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ServiceTestimonials = ({ data }) => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  if (!data || data.length === 0) return null;
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("Testimonials")}
      </h2>

      <Swiper
        dir={lang === "ar" ? "rtl" : "ltr"}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} w-6 h-1 rounded-full inline-block mx-1"></span>`;
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          560: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="flex items-center gap-2 bg-stone-200 p-4 pb-6">
                <span className="h-18 w-18 overflow-hidden rounded-lg">
                  <img
                    loading="lazy"
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </span>

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.job_title}</p>
                </div>
              </div>

              <div className="p-4 pt-6 relative">
                <div className="flex gap-1 bg-white py-1 px-2 rounded absolute left-1/2 -top-3 -translate-x-1/2">
                  {renderStars(item.rating)}
                </div>

                <p className="text-sm text-gray-500 text-center max-w-md mx-auto">
                  {item.paragraph}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className="rich_content"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* ✅ Custom pagination */}
        <div className="custom-pagination flex justify-center items-center mt-6"></div>
      </Swiper>

      {/* ✅ Tailwind inline style */}
      <style>
        {`
          .swiper-pagination-bullet {
            background: #ccc;
            opacity: 1;
            transition: all 0.3s ease;
            width: 10px;
            height: 5px;
            border-radius: 5px;
          }
          .swiper-pagination-bullet-active {
            background: var(--color-myGreen); 
            width: 20px;
          }
        `}
      </style>
    </section>
  );
};

export default ServiceTestimonials;
