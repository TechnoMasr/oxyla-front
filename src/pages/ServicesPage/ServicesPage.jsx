import MainPagination from "../../components/common/MainPagination";
import { getCategories, getServices } from "../../services/serviceServices";
import Filters from "./sections/Filters";
import Services from "./sections/Services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlug = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. إضافة currentPage للـ queryKey ولـ queryFn
  const { data: service, isLoading } = useQuery({
    queryKey: ["service", categorySlug, query, currentPage],
    queryFn: () => getServices(categorySlug, query, currentPage),
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // 3. دالة تحديث الصفحة في الـ URL مع الحفاظ على الفلاتر القديمة
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });

    window.scrollTo(0, 0);
  };

  return (
    <article className="container pagePadding space-y-4 lg:space-y-8">
      <Filters categories={categories} isLoading={isLoadingCategories} />

      <Services services={service?.data} isLoading={isLoading} />

      {!isLoading && service && (
        <MainPagination
          totalPages={
            service.last_page || Math.ceil(service.total / service.per_page)
          }
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </article>
  );
};

export default ServicesPage;
