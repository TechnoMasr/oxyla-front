import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getWishList } from "../../../services/wishListServices";
import EmptyData from "../../../components/sections/EmptyData";
import WishListCard from "../../../components/common/WishListCard";
import MainPagination from "../../../components/common/MainPagination"; // تأكد من المسار الصحيح للباجينيشن
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";
import { useSearchParams } from "react-router-dom";

const Wishlist = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. قراءة الصفحة الحالية من الـ URL وتحويلها لرقم
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. ربط الـ queryKey والـ queryFn بالصفحة الحالية
  const { data: response, isLoading } = useQuery({
    queryKey: ["wishlist", currentPage],
    queryFn: () => getWishList(currentPage),
  });

  if (isLoading) return <AppointmentPageSkeleton />;

  // استخراج الداتا من الريسبونس بناءً على التعديل الجديد للـ API
  const wishlist = response?.data || [];
  // هنا بنستخدم الـ last_page اللي راجع من الباك إند مباشرة
  const totalPages = response?.last_page || 1;

  // 3. دالة تغيير الصفحة في الـ URL
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <section>
      <p className="text-gray-500 font-normal mb-2 mt-1">
        ({" "}
        {t("wishlistPage.itemsCount", {
          count: response?.total || wishlist?.length || 0,
        })}{" "}
        )
      </p>

      <div>
        {wishlist?.map((item) => (
          <WishListCard key={item.id} item={item} />
        ))}
      </div>

      {wishlist?.length === 0 && <EmptyData />}

      {/* 4. عرض مكون الباجينيشن وتمرير البيانات */}
      {!isLoading && wishlist.length > 0 && (
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
