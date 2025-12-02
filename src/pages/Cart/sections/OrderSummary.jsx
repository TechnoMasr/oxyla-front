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
  const [priceData, setPriceData] = useState({
    price: 0,
    discount: 0,
    total: 0,
    coupon_code: "",
  });

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(getProfileAct());
      setOpenDelete(false);
      toast.success(t("OrderSummary.orderConfirmed"));
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
        onConfirm={() => mutate(priceData.coupon_code)}
        disabled={isPending}
        btnText={
          isPending ? t("OrderSummary.ordering") : t("OrderSummary.confirm")
        }
      />
    </aside>
  );
};

export default OrderSummary;
