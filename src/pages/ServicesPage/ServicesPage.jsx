import { getCategories, getServices } from "../../services/serviceServices";
import Filters from "./sections/Filters";
import ServicesList from "./sections/ServicesList";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "all";

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", categorySlug],
    queryFn: () => getServices(categorySlug), // نمرر الـ slug للـ API
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <article className="container pagePadding space-y-4 lg:space-y-8">
      <Filters categories={categories} />
      <ServicesList services={service?.data} />
    </article>
  );
};

export default ServicesPage;
