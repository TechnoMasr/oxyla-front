import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/bookingServices";
import EmptyData from "../../../components/sections/EmptyData";
import CartCard from "../../../components/common/CartCard";
import { useTranslation } from "react-i18next";
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";

const Appointment = () => {
  const { t } = useTranslation();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getBookings,
  });

  if (isLoading) return <AppointmentPageSkeleton />;

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        {t("Appointment.title")}{" "}
        <span className="text-gray-400 text-sm font-normal">
          ({orders?.length} {t("Appointment.reservationCount")})
        </span>
      </h2>

      <div>
        {orders?.map((item) => (
          <CartCard key={item.id} item={item} orders />
        ))}
      </div>

      {orders?.length === 0 && (
        <EmptyData text={t("Appointment.noReservations")} />
      )}
    </section>
  );
};

export default Appointment;
