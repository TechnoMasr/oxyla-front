import { getCategories, getServices } from "../../services/serviceServices";
import Filters from "./sections/Filters";
import Services from "./sections/Services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "";

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", categorySlug, query],
    queryFn: () => getServices(categorySlug, query),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <article className="container pagePadding space-y-4 lg:space-y-8">
      <Filters categories={categories} isLoading={isLoadingCategories} />
      <Services services={service?.data} isLoading={isLoading} />
    </article>
  );
};

export default ServicesPage;
