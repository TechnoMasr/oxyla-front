import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";
import TestimonialsCard from "../../../components/common/TestimonialsCard";

const Story = ({ data }) => {
  const { lang } = useSelector((state) => state.language);

  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="text-2xl font-bold uppercase">{data?.titles}</h2>

        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
          slidesPerView={1}
          className="items-stretch!" // مهم
          breakpoints={{
            560: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {data?.data.map((item) => (
            <SwiperSlide key={item.id} className="h-auto py-4">
              <TestimonialsCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Story;

{
  /* <div className="bg-white rounded-xl shadow-lg flex flex-col justify-between overflow-hidden h-full">
  <div className="w-full aspect-5/3 overflow-hidden rounded-xl">
    {item.image_url && (
      <img
        loading="lazy"
        src={item.image_url}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    )}
  </div>

  <div className="p-4 text-sm">
    <div
      dangerouslySetInnerHTML={{ __html: item.content }}
      className="rich_content line-clamp-4"
    />
    <h3 className="font-bold mt-2 uppercase text-lg">{`— ${item.name}, ${item.job_title}`}</h3>
  </div>
</div>; */
}
