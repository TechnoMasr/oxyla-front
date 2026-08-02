import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/bookingServices";
import EmptyData from "../../../components/sections/EmptyData";
import CartCard from "../../../components/common/CartCard";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";
import MainPagination from "../../../components/common/MainPagination";

const Appointment = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. قراءة الصفحة الحالية من الـ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  // 2. ربط الـ queryKey والـ queryFn بالصفحة الحالية
  const { data: response, isLoading } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => getBookings(currentPage),
  });

  if (isLoading) return <AppointmentPageSkeleton />;

  // استخراج مصفوفة الحجوزات من الريسبونس بناءً على البنية الجديدة
  const orders = response?.data || [];

  // حساب إجمالي الصفحات (يفضل استخدام الـ total_pages أو الـ last_page لو الباك إند بيبعتهم)
  // أو الحسبة الاحتياطية دي بناءً على الـ من الـ API:
  const totalPages =
    response?.last_page ||
    Math.ceil((response?.to || 0) / (response?.per_page || 10)) ||
    1;

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
        ( {orders?.length} {t("Appointment.reservationCount")} )
      </p>

      <div>
        {orders?.map((item) => (
          <CartCard key={item.id} item={item} orders />
        ))}
      </div>

      {orders?.length === 0 && (
        <EmptyData text={t("Appointment.noReservations")} />
      )}

      {/* 4. عرض مكون الباجينيشن وتمرير البيانات */}
      {!isLoading && orders.length > 0 && (
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
