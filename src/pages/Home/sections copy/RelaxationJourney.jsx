import { HiMiniArrowLongRight } from "react-icons/hi2";
import sectionBg from "../../../assets/images/section-bg.jpg";
import LoadingSection from "../../../components/Loading/LoadingSection";
import { useQuery } from "@tanstack/react-query";
import { getRelaxationJourneys } from "../../../services/homeServices";
import { Link } from "react-router-dom";

const RelaxationJourney = () => {
  const {
    data: relaxationJourneys,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["relaxation-journeys"],
    queryFn: getRelaxationJourneys,
  });

  const data = (relaxationJourneys && relaxationJourneys[0]) || {};

  if (isLoading) return <LoadingSection />;

  if (isError || !relaxationJourneys) return null;

  return (
    <section
      className="py-20 bg-cover bg-center bg-no-repeat my-10 text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${sectionBg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="container relative z-10 space-y-6 lg:space-y-10">
        <h1 className="text-3xl md:text-5xl lg:text-[70px] font-bold text-shadow text-center">
          {data?.title}
        </h1>

        <hr className="my-4 mb-8 border-t-2" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-lg mb-4 max-w-md text-center lg:text-start ms-auto me-auto lg:ms-0">
              {data?.description}
            </p>

            <Link
              to={data?.button_link}
              className="mainBtn light rounded-full! hidden! lg:flex! w-fit!"
            >
              {data?.button_text} <HiMiniArrowLongRight />
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data?.items.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="h-60 rounded-2xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-center">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          to={data?.button_link}
          className="mainBtn light rounded-full! lg:hidden! mx-auto w-fit!"
        >
          {data?.button_text} <HiMiniArrowLongRight />
        </Link>
      </div>
    </section>
  );
};

export default RelaxationJourney;
