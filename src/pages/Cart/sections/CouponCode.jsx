import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "../../../services/cartServices";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const CouponCode = ({ setPriceData, discount }) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      setPriceData((prev) => ({
        ...prev,
        coupon_code: inputValue,
        price: data?.subtotal,
        coupon_amount: data?.discount,
        total: data?.total_after_discount,
      }));

      toast.success(t("coupon.success"));
    },
  });

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    mutate(inputValue);
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
          value={inputValue}
          onChange={handleChange}
        />

        <button
          className="bg-myGreen text-white px-4 py-2 rounded-lg cursor-pointer hover:brightness-90"
          disabled={isPending}
        >
          {isPending ? (
            <BiLoaderAlt className="size-4 animate-spin" />
          ) : (
            t("coupon.apply")
          )}
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
        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded text-center text-sm wrap-break-word">
          {error?.response?.data?.message || t("coupon.invalid")}
        </div>
      )}
    </div>
  );
};

export default CouponCode;
