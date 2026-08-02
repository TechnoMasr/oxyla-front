import EmptyData from "../sections/EmptyData";
import ServicesCard from "./ServicesCard";

const ServicesList = ({ services }) => {
  if (!services || !services.length) return <EmptyData />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
      {services?.map((service) => (
        <ServicesCard key={service.id} service={service}  />
      ))}
    </div>
  );
};

export default ServicesList;
