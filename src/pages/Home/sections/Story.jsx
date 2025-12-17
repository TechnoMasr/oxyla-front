import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useSelector } from "react-redux";

const Story = ({ data }) => {
  const { lang } = useSelector((state) => state.language);

  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="text-2xl font-bold uppercase">{data?.titles}</h2>

        <Swiper
          dir={lang === "ar" ? "rtl" : "ltr"}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            560: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
          }}
        >
          {data?.data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-xl shadow-lg flex flex-col justify-between overflow-hidden">
                <div className="w-full h-48 overflow-hidden rounded-xl">
                  <img
                    loading="lazy"
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 text-sm">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  <h3 className="font-bold mt-2 uppercase text-lg">{`— ${item.name}, ${item.job_title}`}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Story;
