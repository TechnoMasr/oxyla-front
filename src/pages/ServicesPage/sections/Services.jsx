import { useTranslation } from "react-i18next";
import ServicesList from "../../../components/common/ServicesList";

const Services = ({ services, isLoading }) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="text-3xl font-bold mb-4">{t("MostBookedCapsules")}</h3>

      <ServicesList services={services} isLoading={isLoading} />
    </section>
  );
};

export default Services;
