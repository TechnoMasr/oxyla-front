import { useTranslation } from "react-i18next";
import ServicesSectionSkeleton from "../../../components/Loading/SkeletonLoading/ServicesSectionSkeleton";
import EmptyData from "../../../components/sections/EmptyData";
import ServicesCard from "../../../components/common/ServicesCard";

const Services = ({ services, isLoading }) => {
  const { t } = useTranslation();

  return (
    <section>
      <h3 className="text-3xl font-bold mb-4">{t("MostBookedCapsules")}</h3>

      {isLoading ? (
        <ServicesSectionSkeleton />
      ) : services?.length === 0 ? (
        <EmptyData text={t("NoServices")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {services?.map((service) => (
            <ServicesCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Services;
