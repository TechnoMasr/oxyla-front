import CartCard from "../../../components/common/CartCard";
import EmptyData from "../../../components/sections/EmptyData";

const CartList = ({ data }) => {
  return (
    <section className="lg:col-span-2">
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
