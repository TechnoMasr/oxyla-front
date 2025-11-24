import { HiMiniCalendarDateRange } from "react-icons/hi2";
import {
  IoIosArrowBack,
  IoIosArrowDropright,
  IoIosArrowForward,
} from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../../services/homeServices";
import LoadingSection from "../../../components/Loading/LoadingSection";

const Features = () => {
  const {
    data: news,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !news) return null;

  return (
    <section className="sectionPadding container">
      {/* 🧠 Header with title + navigation buttons */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h3 className="text-3xl font-bold">Feature News</h3>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <button className="swiper-button-prev-custom-features text-2xl border border-gray-300 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer">
            <IoIosArrowBack />
          </button>
          <button className="swiper-button-next-custom-features text-2xl border border-gray-300 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* 🧩 Swiper slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next-custom-features",
          prevEl: ".swiper-button-prev-custom-features",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-black !opacity-60",
          bulletActiveClass: "!opacity-100",
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          560: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="relative"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="w-full h-44">
                <img
                  src={item.main_image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <HiMiniCalendarDateRange />
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <h4 className="text-lg font-bold">{item.title}</h4>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {item.short_description}
                </p>

                <a
                  href={item.link}
                  className="flex items-center gap-1 font-bold text-myGreen w-fit group"
                >
                  <IoIosArrowDropright className="text-2xl group-hover:rotate-90 transition-all" />
                  See More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination-custom !bottom-[-10px] !relative mt-10"></div>
      </Swiper>
    </section>
  );
};

export default Features;
