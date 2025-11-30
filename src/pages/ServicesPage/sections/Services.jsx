import ServicesList from "../../../components/common/ServicesList";

const Services = ({ services, isLoading }) => {
  return (
    <section>
      <h3 className="text-3xl font-bold mb-4">Most Booked Capsules</h3>

      <ServicesList services={services} isLoading={isLoading} />
    </section>
  );
};

export default Services;
