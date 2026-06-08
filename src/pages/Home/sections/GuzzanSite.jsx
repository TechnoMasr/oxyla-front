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
    <section
      className="relative my-16 md:my-28 mx-4 max-w-7xl lg:mx-auto rounded-3xl bg-gray-200 
      border border-gray-100 text-gray-900 overflow-hidden shadow-xl shadow-gray-200/50 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* شبكة النقاط الخلفية الهادئة باللون الرمادي الفاتح */}
      <div className="absolute inset-0 rounded-3xl opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      <div className="absolute inset-0  bg-black/20 z-0"></div>

      {/* إضاءات خلفية ناعمة جداً بألوانك المبهجة */}
      <div className="absolute -top-12 -end-12 w-72 h-72 bg-myPurple/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-12 -start-12 w-72 h-72 bg-myGreen/20 rounded-full blur-3xl z-0"></div>

      <div className="relative z-10 px-6 py-12 lg:py-0 lg:h-[400px] flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
        {/* الجانب الأيمن: النصوص وزر الانتقال */}
        <div className="space-y-5 max-w-xl text-center lg:text-start py-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
            {data?.title}
          </h2>

          <p className="text-sm md:text-base text-white leading-relaxed">
            {data?.description}
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <a
              href={data?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl text-myPurple bg-white hover:brightness-90 shadow-lg shadow-myBlue/15 transition-all duration-300 active:scale-95 group gap-2"
            >
              <span>{t("GuzzanSite.archiveBtn")}</span>

              <FaArrowRightLong className="transform group-hover:-translate-x-1 transition-transform duration-250 rtl:rotate-180 ltr:group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* الجانب الأيسر: الوهم البصري للصورة ثلاثية الأبعاد */}
        <div className="relative w-full lg:w-1/2 h-[240px] lg:h-full flex items-center justify-center lg:justify-end group perspective-[1000px]">
          {/* الكارت المائل ثلاثي الأبعاد للصورة */}
          {data?.image && (
            <div className="relative w-[320px] md:w-[380px] aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-gray-200/80 bg-gray-50 transition-all duration-500 transform lg:rotate-y-[25deg] lg:rotate-x-[10deg] lg:-translate-y-4 group-hover:rotate-y-0 group-hover:rotate-x-0 group-hover:translate-y-[-8px] group-hover:scale-105 z-10">
              {/* غطاء شفاف خفيف فوق الصورة ليناسب المظهر الفاتح قبل الهوفر */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60 z-10"></div>
              <img
                src={data?.image}
                alt="Old Guzzan Preview"
                className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          )}

          {/* اللوح الزجاجي الفاتح العائم الأمامي (Glassmorphic Card) */}
          <div className="absolute bottom-4 end-4 lg:bottom-8 lg:end-24 z-20 bg-white/60 backdrop-blur-md border border-white/80 px-4 py-3 rounded-xl shadow-lg shadow-gray-200/50 transform lg:-translate-x-4 lg:translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0 hidden sm:block">
            <p className="text-[10px] text-myGreen uppercase tracking-wider font-bold">
              Muzzan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuzzanSite;
