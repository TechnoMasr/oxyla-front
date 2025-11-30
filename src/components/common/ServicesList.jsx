import EmptyData from "../sections/EmptyData";
import ServicesCard from "./ServicesCard";
import LoadingSection from "../Loading/LoadingSection";

const ServicesList = ({ services, isLoading }) => {
  if (isLoading) return <LoadingSection />;

  if (!services || !services.length) return <EmptyData />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10">
      {services?.map((service) => (
        <ServicesCard
          key={service.id}
          service={service}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default ServicesList;
