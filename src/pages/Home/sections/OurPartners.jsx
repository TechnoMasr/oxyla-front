import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import { getOurPartners } from "../../../services/homeServices";
import OurPartnersSkeleton from "../../../components/Loading/SkeletonLoading/OurPartnersSkeleton";

const OurPartners = () => {
  const { lang } = useSelector((state) => state.language);

  const marqueeDirection = lang === "ar" ? "right" : "left";

  const { data, isLoading } = useQuery({
    queryKey: ["ourPartners"],
    queryFn: getOurPartners,
  });

  if (isLoading) return <OurPartnersSkeleton />;

  if (!data) return null;

  return (
    <section className="sectionPadding bg-gray-100 overflow-hidden">
      <div className="w-full space-y-4 lg:space-y-8 mx-auto px-4">
        <h2 className="font-bold text-lg lg:text-2xl uppercase text-gray-800 tracking-wider text-center">
          {lang === "ar" ? "شركاؤنا" : "Our Partners"}
        </h2>

        {/* شريط Marquee الذكي */}
        <div dir="ltr">
          <Marquee
            direction={marqueeDirection}
            speed={100}
            gradient={true}
            gradientColor={[243, 244, 246]}
            pauseOnHover={true}
          >
            <div className="flex items-center gap-12 md:gap-16 pr-12 pl-12">
              {data?.map((partner) => (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={partner.id}
                  className="w-36 aspect-video overflow-hidden cursor-pointer"
                >
                  {partner.logo && (
                    <img
                      src={partner.logo}
                      className="w-full h-full object-contain"
                      alt={partner.name || "partner logo"}
                    />
                  )}
                </a>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
