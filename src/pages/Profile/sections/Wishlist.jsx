import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getWishList } from "../../../services/wishListServices";
import WishListCard from "../../../components/common/WishListCard";
import MainPagination from "../../../components/common/MainPagination";
import EmptyData from "../../../components/sections/EmptyData";
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";

const Wishlist = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. قراءة رقم الصفحة من الـ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. طلب البيانات
  const { data: response, isLoading } = useQuery({
    queryKey: ["wishlist", currentPage],
    queryFn: () => getWishList(currentPage),
  });

  const wishlist = response?.data || [];
  const totalPages = response?.last_page || 1;
  const totalItems = response?.total || 0;

  // 3. معالجة التراجع تلقائياً إذا كانت الصفحة الحالية أصلها غير موجود بعد الحذف (مثلاً صفحة 2 وأصبحت فارغة)
  useEffect(() => {
    if (!isLoading && currentPage > totalPages && totalPages > 0) {
      setSearchParams((prev) => {
        prev.set("page", totalPages.toString());
        return prev;
      });
    }
  }, [currentPage, totalPages, isLoading, setSearchParams]);

  // 4. دالة تغيير الصفحة
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  if (isLoading) return <AppointmentPageSkeleton />;

  return (
    <section className="space-y-4">
      {/* عدد العناصر */}
      <p className="text-gray-500 font-normal mb-2 mt-1">
        ({t("wishlistPage.itemsCount", { count: totalItems })})
      </p>

      {/* عرض القائمة أو الرسالة الفارغة */}
      {wishlist.length === 0 ? (
        <EmptyData text={t("wishlistPage.noItems")} />
      ) : (
        <div>
          {wishlist.map((item) => (
            <WishListCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* عرض الباجينيشن فقط عند وجود عناصر وأكثر من صفحة واحدة */}
      {!isLoading && wishlist.length > 0 && totalPages > 1 && (
        <MainPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Wishlist;
