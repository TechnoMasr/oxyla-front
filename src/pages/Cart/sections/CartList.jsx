import CartCard from "../../../components/common/CartCard";
import EmptyData from "../../../components/sections/EmptyData";
import { useTranslation } from "react-i18next";

const CartList = ({ data }) => {
  const { t } = useTranslation();

  return (
    <section className="md:col-span-2">
      <hgroup className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold">{t("Cart.title")}</h2>
        <p className="text-gray-500">
          ({data?.length} {t("Cart.items")})
        </p>
      </hgroup>

      {data?.length === 0 && <EmptyData />}

      <div>
        {data?.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CartList;
