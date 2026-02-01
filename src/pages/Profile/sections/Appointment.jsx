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
    </section>
  );
};

export default Appointment;
