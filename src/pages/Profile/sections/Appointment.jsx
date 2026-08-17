import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBookings } from "../../../services/bookingServices";
import EmptyData from "../../../components/sections/EmptyData";
import CartCard from "../../../components/common/CartCard";
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";
import MainPagination from "../../../components/common/MainPagination";

const Appointment = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. قراءة الصفحة الحالية من الـ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. طلب البيانات
  const { data: response, isLoading } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => getBookings(currentPage),
  });

  const orders = response?.data || [];
  const totalPages =
    response?.last_page ||
    Math.ceil((response?.total || 0) / (response?.per_page || 10)) ||
    1;
  const totalOrders = response?.total || 0;

  // 3. التراجع للصفحة الأخيرة في حال تم تعديل الـ URL برقم صفحة غير موجود
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
      {/* عرض إجمالي عدد الحجوزات */}
      <p className="text-gray-500 font-normal mb-2 mt-1">
        ( {totalOrders} {t("Appointment.reservationCount")} )
      </p>

      {/* القائمة أو الرسالة الفارغة */}
      {orders.length === 0 ? (
        <EmptyData text={t("Appointment.noReservations")} />
      ) : (
        <div className="space-y-3">
          {orders.map((item) => (
            <CartCard key={item.id} item={item} orders />
          ))}
        </div>
      )}

      {/* عرض الباجينيشن فقط عند وجود أكثر من صفحة */}
      {!isLoading && orders.length > 0 && totalPages > 1 && (
        <MainPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Appointment;
