import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "../../../services/cartServices";

const CouponCode = ({ setPriceData, priceData }) => {
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      setPriceData((prev) => ({
        ...prev,
        price: data?.subtotal,
        discount: data?.discount,
        total: data?.total_after_discount,
      }));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!priceData.coupon_code.trim()) return;

    mutate(priceData.coupon_code);
  };

  return (
    <div className="flex flex-col gap-2">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={"couponCode"}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-myGreen"
          value={priceData.coupon_code}
          onChange={(e) =>
            setPriceData((prev) => ({ ...prev, coupon_code: e.target.value }))
          }
        />

        <button
          className="bg-myGreen text-white px-4 py-2 rounded-lg cursor-pointer hover:brightness-90"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Apply"}
        </button>
      </form>

      {/* Error handling */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded text-center">
          {error?.response?.data?.message || "Invalid coupon"}
        </div>
      )}

      {/* Success message */}
      {data && (
        <p className="bg-green-100 border border-green-400 text-green-700 p-2 rounded text-center">
          Coupon applied successfully!
        </p>
      )}
    </div>
  );
};

export default CouponCode;
