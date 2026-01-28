import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "../../../services/cartServices";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const CouponCode = ({ setPriceData, priceData, discount }) => {
  const { t } = useTranslation();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      setPriceData((prev) => ({
        ...prev,
        price: data?.subtotal,
        coupon_code: "",
        coupon: priceData?.coupon_code,
        coupon_amount: data?.discount,
        total: data?.total_after_discount,
      }));

      toast.success(t("coupon.success"));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!priceData.coupon_code.trim()) return;
    mutate(priceData.coupon_code);
  };

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex gap-2"
        onSubmit={handleSubmit}
        style={{
          pointerEvents: discount ? "none" : "",
          opacity: discount ? 0.6 : 1,
        }}
      >
        <input
          type="text"
          placeholder={t("coupon.placeholder")}
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
          {isPending ? t("coupon.loading") : t("coupon.apply")}
        </button>
      </form>

      {/* Already has discount */}
      {discount && (
        <p className="bg-gray-100 border border-gray-400 text-gray-700 p-1 rounded-full text-center">
          {t("coupon.alreadyApplied")}
        </p>
      )}

      {/* Error */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded text-center wrap-break-word">
          {error?.response?.data?.message || t("coupon.invalid")}
        </div>
      )}
    </div>
  );
};

export default CouponCode;
