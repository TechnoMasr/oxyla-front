import { useQuery } from "@tanstack/react-query";
import { getHomeSection1 } from "../../../services/homeServices";
import GuzzanSiteSkeleton from "../../../components/Loading/SkeletonLoading/GuzzanSiteSkeleton";
import { useTranslation } from "react-i18next";
import bg from "../../../assets/images/muzzan-bg.jpg";
import { FaArrowRightLong } from "react-icons/fa6";

const GuzzanSite = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ["GuzzanSite"],
    queryFn: getHomeSection1,
  });

  if (isLoading) return <GuzzanSiteSkeleton />;

  if (!data) return null;

  return (
    <section className="sectionPadding container">
      <div
        className="relative my-8 md:my-16 rounded-3xl bg-gray-200 group border border-gray-100
text-gray-900 overflow-hidden shadow-xl shadow-gray-200/50 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* غيّرنا lg:h-[400px] إلى lg:min-h-[400px] وأضفنا lg:py-12 لمنح المساحة الكافية */}
        <div className="relative z-10 px-6 lg:px-12 py-12 lg:min-h-[400px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-12">
          <div className="space-y-5 text-center lg:text-start py-4 xl:col-span-3 content-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
              {data?.title}
            </h2>

            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="rich_content text-sm md:text-base text-white leading-relaxed"
            />

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href={data?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl text-myPurple group bg-white 
                hover:brightness-90 shadow-lg shadow-myBlue/15 transition-all duration-300 active:scale-95 gap-2"
              >
                <span>{t("GuzzanSite.archiveBtn")}</span>

                <FaArrowRightLong className="transform group-hover:-translate-x-1 transition-transform duration-250 rtl:rotate-180 ltr:group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* تعديل حاوية الصورة لتأخذ مساحة فعلية مستقرة */}
          <div className="relative flex items-center justify-center lg:justify-end perspective-[1000px] xl:col-span-2">
            {data?.image && (
              <div
                className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-gray-50 
              transition-all duration-500 transform lg:rotate-y-[25deg] lg:rotate-x-[10deg] lg:-translate-y-4 group-hover:rotate-y-0 group-hover:rotate-x-0 group-hover:translate-y-[-8px] group-hover:scale-105 z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60 z-10"></div>
                <img
                  src={data?.image}
                  alt="Old Guzzan Preview"
                  className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            )}

            <div
              className="absolute bottom-0 left-0 z-20 bg-white/60 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl 
              shadow-lg shadow-gray-200/50 transition-all duration-500 ease-out
              group-hover:translate-x-1/2 group-hover:translate-y-1/2"
            >
              <p className="text-sm text-myGreen uppercase tracking-wider font-bold">
                Gazzan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuzzanSite;
