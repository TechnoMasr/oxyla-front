import { useQuery } from "@tanstack/react-query";
import CartList from "./sections/CartList";
import OrderSummary from "./sections/OrderSummary";
import { getCart } from "../../services/cartServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isLoading) return <LoadingPage />;

  return (
    <article className={`container pagePadding`}>
      <hgroup className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">{t("Cart.title")}</h2>
        <p className="text-gray-500">
          ({cart?.bookings?.length} {t("Cart.items")})
        </p>
      </hgroup>

      <div
        className={`grid gap-8 ${
          cart?.bookings?.length > 0
            ? "grid-cols-1 lg:grid-cols-3"
            : "grid-cols-1 justify-items-center"
        }`}
      >
        <CartList data={cart?.bookings} />

        {cart?.bookings?.length > 0 && <OrderSummary data={cart} />}
      </div>
    </article>
  );
};

export default Cart;
