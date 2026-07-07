import { useTranslation } from "react-i18next";
import ServicesList from "../../../components/common/ServicesList";
import ServicesSectionSkeleton from "../../../components/Loading/SkeletonLoading/ServicesSectionSkeleton";
import EmptyData from "../../../components/sections/EmptyData";

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
        <ServicesList services={services} />
      )}
    </section>
  );
};

export default Services;
