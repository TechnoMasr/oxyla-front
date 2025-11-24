import img from "../../../assets/images/book-img.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Story = () => {
  const list = [
    {
      id: 1,
      name: "aly",
      jop: "Athlete",
      description:
        "After one session at Oxyla, my post-workout recovery time dropped dramatically. Incredible experience!",
      image: img,
    },
    {
      id: 2,
      name: "sara",
      jop: "Artist",
      description:
        "After one session at Oxyla, my post-workout recovery time dropped dramatically. Incredible experience!",
      image: img,
    },
    {
      id: 3,
      name: "mohamed",
      jop: "Artist",
      description:
        "After one session at Oxyla, my post-workout recovery time dropped dramatically. Incredible experience!",
      image: img,
    },
    {
      id: 4,
      name: "lina",
      jop: "Artist",
      description:
        "After one session at Oxyla, my post-workout recovery time dropped dramatically. Incredible experience!",
      image: img,
    },
  ];

  return (
    <section className="sectionPadding bg-gray-100">
      <div className="container space-y-4 lg:space-y-8">
        <h2 className="font-bold text-lg">Every Breath Tells a Story.</h2>

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
              <div className="bg-white h-48 rounded-xl shadow-lg overflow-hidden flex flex-col justify-end">
                <div className="p-4 text-sm">
                  <p>{`“${item.description}”`}</p>
                  <h3 className="font-bold mt-2 capitalize">{`— ${item.name}, ${item.jop}`}</h3>
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
