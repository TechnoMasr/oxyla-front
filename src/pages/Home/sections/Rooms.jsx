import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Rooms = ({ data }) => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="text-2xl font-bold uppercase">{data?.title}</h2>

        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            560: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
        >
          {data?.data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 text-sm min-h-28">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="font-semibold line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="w-full h-56 lg:h-72 overflow-hidden rounded-xl">
                  <img
                    src={item.image_url}
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
            to="/services"
            className="flex items-center gap-1 font-semibold hover:underline"
          >
            {t("ExploreMoreRooms")} <GoArrowUpRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
