import { useQuery } from "@tanstack/react-query";
import GradientTitle from "../../../components/common/GradientTitle";
import LoadingSection from "../../../components/Loading/LoadingSection";
import { getWhyChooseUsFeatures } from "../../../services/homeServices";

const WhyChooseUS = () => {
  const {
    data: whyChooseUsFeatures,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["why-choose-us-features"],
    queryFn: getWhyChooseUsFeatures,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !whyChooseUsFeatures) return null;

  return (
    <section className="sectionPadding container">
      <GradientTitle title="Why Choose Us" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {whyChooseUsFeatures?.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-1 group">
            <span className="h-18 overflow-hidden mb-4">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </span>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUS;
