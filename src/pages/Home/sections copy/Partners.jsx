import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../../../services/homeServices";
import LoadingSection from "../../../components/Loading/LoadingSection";

const Partners = () => {
  const {
    data: partners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !partners) return null;
  return (
    <section className="sectionPadding my-8">
      <h2 className="text-myGreen text-3xl lg:text-4xl font-bold text-center mb-10 lg:mb-14 uppercase">
        Our Partners
      </h2>

      <Marquee speed={200} gradient={false}>
        {partners?.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            className="h-24 w-32 lg:w-52 overflow-hidden flex items-center justify-center mx-4 lg:mx-10"
          >
            <img
              src={item.logo}
              alt={`partner-${item.id}`}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </Marquee>
    </section>
  );
};

export default Partners;
