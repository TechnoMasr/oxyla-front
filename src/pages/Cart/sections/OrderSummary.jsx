import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../../../services/cartServices";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CouponCode from "./CouponCode";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../../store/profile/profileSlice";

const OrderSummary = ({ data }) => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [priceData, setPriceData] = useState({
    price: 0,
    discount: 0,
    total: 0,
    coupon_code: "",
  });

  const dispatch = useDispatch();

  const { mutate, isPending, error } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: (res) => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(getProfileAct());
      setOpenDelete(false);
      toast.success(t("OrderSummary.orderConfirmed"));

      if (paymentMethod === "online" && res?.redirect_url) {
        window.location.href = res.redirect_url;
      }
    },
  });

  useEffect(() => {
    if (data?.total_price !== undefined) {
      setPriceData((prev) => ({
        ...prev,
        price: data.total_price,
        total: data.total_price - prev.discount,
      }));
    }
  }, [data]);

  return (
    <aside className="border border-gray-200 rounded-xl p-4 lg:p-6 bg-white shadow-sm h-fit">
      <h3 className="text-lg font-semibold mb-4">
        {t("OrderSummary.orderSummary")}
      </h3>

      <div className="space-y-3">
        {/* Price */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.price")}</span>
          <span className="font-medium">{priceData.price} $</span>
        </div>

        {/* Coupon */}
        {priceData.discount > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>{t("OrderSummary.couponApplied")}</span>
            <span className="font-medium">{priceData.discount} $</span>
          </div>
        )}

        <hr className="my-4" />

        {/* Total */}
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-semibold text-lg">
            {t("OrderSummary.total")}
          </span>
          <span className="font-bold text-lg">{priceData.total} $</span>
        </div>

        {/* Coupon Input */}
        <CouponCode setPriceData={setPriceData} priceData={priceData} />

        {/* Payment Method */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">
            {t("OrderSummary.paymentMethod")}
          </h3>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <span className="text-sm">{t("OrderSummary.cash")}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span className="text-sm">{t("OrderSummary.online")}</span>
          </label>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => setOpenDelete(true)}
          disabled={isPending}
          type="button"
          className="mainBtn w-full mt-4"
        >
          {isPending
            ? t("OrderSummary.loading")
            : t("OrderSummary.proceedToCheckout")}
        </button>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        openModal={openDelete}
        onClose={() => setOpenDelete(false)}
        confirmMsg={t("OrderSummary.confirmOrderMsg")}
        onConfirm={() =>
          mutate({
            coupon_code: priceData.coupon_code,
            payment_method: paymentMethod,
          })
        }
        disabled={isPending}
        btnText={
          isPending ? t("OrderSummary.ordering") : t("OrderSummary.confirm")
        }
        error={error}
      />
    </aside>
  );
};

export default OrderSummary;
