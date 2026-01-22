import { useTranslation } from "react-i18next";
import ServicesList from "../../../components/common/ServicesList";
import ServicesSectionSkeleton from "../../../components/Loading/SkeletonLoading/ServicesSectionSkeleton";

const Services = ({ services, isLoading }) => {
  const { t } = useTranslation();

  if (isLoading) return <ServicesSectionSkeleton />;
  return (
    <section>
      <h3 className="text-3xl font-bold mb-4">{t("MostBookedCapsules")}</h3>

      <ServicesList services={services}/>
    </section>
  );
};

export default Services;
