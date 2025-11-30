import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/bookingServices";
import EmptyData from "../../../components/sections/EmptyData";
import CartCard from "../../../components/common/CartCard";
import LoadingSection from "../../../components/Loading/LoadingSection";

const Appointment = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getBookings,
  });

  if (isLoading) return <LoadingSection />;

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        Appointment{" "}
        <span className="text-gray-400 text-sm font-normal">
          ({orders?.length} reseve)
        </span>
      </h2>

      {orders?.length === 0 && <EmptyData />}

      <div>
        {orders?.map((item) => (
          <CartCard key={item.id} item={item} orders />
        ))}
      </div>
    </section>
  );
};

export default Appointment;
