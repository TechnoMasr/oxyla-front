import { useParams } from "react-router-dom";
import DetailsSection from "./sections/DetailsSection";
import ImagesSlider from "./sections/ImagesSlider";
import ServiceTestimonials from "./sections/ServiceTestimonials";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/Loading/LoadingPage";
import { getServiceById } from "../../services/serviceServices";
import EmptyData from "../../components/sections/EmptyData";

const ServiceDetails = () => {
  const { id } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
  });

  if (isLoading) return <LoadingPage />;
  if (!service) return <EmptyData page />;

  return (
    <article className="container pagePadding">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DetailsSection data={service} />
        <ImagesSlider images={service?.images_url} />
      </div>

      <ServiceTestimonials data={service?.testimonials} />
    </article>
  );
};

export default ServiceDetails;
