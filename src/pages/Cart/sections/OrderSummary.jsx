import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../../../services/cartServices";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const OrderSummary = ({ data }) => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      setOpenDelete(false);
      toast.success(t("OrderSummary.orderConfirmed"));
    },
  });

  return (
    <aside className="border border-gray-200 rounded-xl p-4 lg:p-6 bg-white shadow-sm h-fit">
      <h3 className="text-lg font-semibold mb-4">
        {t("OrderSummary.orderSummary")}
      </h3>

      <div className="space-y-3">
        {/* Price */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.price")}</span>
          <span className="font-medium">$319.98</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.discount")}</span>
          <span className="font-medium">$31.9</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.shipping")}</span>
          <span className="text-myGreen font-medium cursor-pointer">
            {t("OrderSummary.free")}
          </span>
        </div>

        {/* Coupon */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.couponApplied")}</span>
          <span className="font-medium">$0.00</span>
        </div>

        <hr className="my-4" />

        {/* Total */}
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-semibold text-lg">
            {t("OrderSummary.total")}
          </span>
          <span className="font-bold text-lg">{data?.total_price} $</span>
        </div>

        {/* Date */}
        <div className="flex justify-between items-center text-gray-700">
          <span>{t("OrderSummary.scheduledSessionDate")}</span>
          <span className="font-medium">01 Feb, 2023</span>
        </div>

        {/* Coupon Input */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder={t("OrderSummary.couponCode")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-myGreen"
          />
          <span className="absolute right-3 top-2.5 text-gray-500 text-lg cursor-pointer">
            <i className="fa-solid fa-tag"></i>
          </span>
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
        confirmMsg={t("OrderSummary.confirmDeleteMsg")}
        onConfirm={mutate}
        disabled={isPending}
        btnText={
          isPending ? t("OrderSummary.removing") : t("OrderSummary.confirm")
        }
      />
    </aside>
  );
};

export default OrderSummary;
