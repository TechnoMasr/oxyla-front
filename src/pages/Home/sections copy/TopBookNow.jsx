import bookImg from "../../../assets/images/book-img.jpg";
import GradientTitle from "../../../components/common/GradientTitle";
import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../services/homeServices";
import LoadingSection from "../../../components/Loading/LoadingSection";

const booksList = [
  {
    id: 1,
    title: "Book 1",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 1",
    rate: 4.5,
  },
  {
    id: 2,
    title: "Book 2",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 2",
    rate: 4.5,
  },
  {
    id: 3,
    title: "Book 3",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 3",
    rate: 4.5,
  },
  {
    id: 4,
    title: "Book 4",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 4",
    rate: 4.5,
  },
  {
    id: 5,
    title: "Book 5",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 5",
    rate: 4.5,
  },
  {
    id: 6,
    title: "Book 6",
    images: [bookImg, bookImg, bookImg],
    price: 100,
    address: "Address 6",
    rate: 4.5,
  },
];

const TopBookNow = () => {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !services) return null;

  return (
    <section className="sectionPadding container">
      <GradientTitle title="Top Book Now" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {booksList?.map((book) => (
          <div key={book.id} className="flex flex-col group">
            <div className="aspect-square mb-2 rounded-2xl overflow-hidden relative">
              {/* Swiper for book images */}
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet !bg-white !opacity-60",
                  bulletActiveClass: "!opacity-100",
                }}
                className="w-full h-full"
              >
                {book.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={`${book.title}-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Rating badge */}
              <div className="absolute top-2 right-2 bg-black/40 rounded-lg py-1 px-2 flex items-center gap-1 z-10">
                <span className="text-sm text-white">{book.rate}</span>
                <FaStar className="text-yellow-400 text-sm" />
              </div>
            </div>

            <div className="flex justify-between gap-2 text-lg">
              <h3 className="line-clamp-2">{book.title}</h3>
              <span className="font-bold">${book.price}</span>
            </div>

            <p className="text-sm text-gray-600 flex items-center gap-1">
              <CiLocationOn />
              {book.address}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="mainBtn rounded-full! min-w-[180px]">
          See All <HiMiniArrowLongRight />
        </button>
      </div>
    </section>
  );
};

export default TopBookNow;
