import { useQuery } from "@tanstack/react-query";
import CartList from "./sections/CartList";
import OrderSummary from "./sections/OrderSummary";
import { getCart } from "../../services/cartServices";
import LoadingPage from "../../components/Loading/LoadingPage";

const Cart = () => {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isLoading) return <LoadingPage />;

  return (
    <article className="container pagePadding grid grid-cols-1 md:grid-cols-3 gap-8">
      <CartList data={cart?.bookings} />
      <OrderSummary data={cart} />
    </article>
  );
};

export default Cart;
