import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmOrder } from "../../../services/cartServices";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CouponCode from "./CouponCode";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../../store/profile/profileSlice";
// import { IoCashOutline, IoCardOutline } from "react-icons/io5";
import currencyIcon from "../../../assets/icons/sar-icon.svg";

const OrderSummary = ({ data }) => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const [priceData, setPriceData] = useState({
    price: 0,
    discount: 0,
    coupon_amount: 0,
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

      if (res?.redirect_url) {
        window.location.href = res.redirect_url;
      } else {
        toast.success(t("OrderSummary.orderConfirmed"));
      }
    },
  });

  useEffect(() => {
    if (data?.total_price !== undefined) {
      setPriceData((prev) => ({
        ...prev,
        price: data.mainTotalBookings
          ? data.mainTotalBookings
          : data.total_price,
        discount: data.discount,
        coupon_code: data.coupon_code,
        coupon_amount: data.coupon_amount,
        total: data.total_price,
      }));
    }
  }, [data]);

  return (
    <aside className="border border-gray-200 rounded-xl p-4 lg:p-6 bg-white shadow-sm h-fit space-y-4">
      <h3 className="text-lg font-semibold">
        {t("OrderSummary.orderSummary")}
      </h3>

      <div className="space-y-2">
        {/* Price */}
        <div className="flex justify-between text-gray-700">
          <span>{t("OrderSummary.price")}</span>
          <span className="font-medium flex items-center gap-1">
            {priceData.price}{" "}
            <img src={currencyIcon} alt="currency-icon" className="w-4" />
          </span>
        </div>

        {/* discount */}
        {priceData.discount > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>{t("OrderSummary.discount")}</span>
            <span className="font-medium flex items-center gap-1">
              {`(${data.discountPercent}%)`} {priceData.discount}{" "}
              <img src={currencyIcon} alt="currency-icon" className="w-4" />
            </span>
          </div>
        )}

        {/* Coupon Code */}
        {priceData?.coupon_code?.length > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>{t("OrderSummary.coupon")}</span>
            <span className="font-medium">{priceData.coupon_code}</span>
          </div>
        )}

        {/* Coupon Applied */}
        {priceData.coupon_amount > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>{t("OrderSummary.couponApplied")}</span>
            <span className="font-medium flex items-center gap-1">
              {priceData.coupon_amount}{" "}
              <img src={currencyIcon} alt="currency-icon" className="w-4" />
            </span>
          </div>
        )}

        <hr />

        {/* Total */}
        <div className="flex justify-between items-center text-gray-900">
          <span className="font-semibold text-lg">
            {t("OrderSummary.total")}
          </span>
          <span className="font-bold text-lg flex items-center gap-1">
            {priceData.total}{" "}
            <img src={currencyIcon} alt="currency-icon" className="w-4" />
          </span>
        </div>
      </div>

      {/* Coupon Input */}
      <CouponCode
        setPriceData={setPriceData}
        priceData={priceData}
        discount={data?.discountPercent && data?.discountPercent > 0}
      />

      {/* Payment Method */}
      {/* <div>
          <h3 className="text-lg font-semibold mb-2">
            {t("OrderSummary.paymentMethod")}
          </h3>

          <div className="flex gap-3">
            <label
              className={`flex-1 cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-2 transition-all duration-200 ${
                paymentMethod === "cash"
                  ? "border-myPurple bg-myPurple/10 shadow-md"
                  : "border-gray-200 bg-white hover:border-myPurple hover:shadow-sm"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="hidden"
              />
              <IoCashOutline className="w-8 h-8" />
              <span className="text-sm font-medium">
                {t("OrderSummary.cash")}
              </span>
            </label>

            <label
              className={`flex-1 cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-2 transition-all duration-200 ${
                paymentMethod === "online"
                  ? "border-myPurple bg-myPurple/10 shadow-md"
                  : "border-gray-200 bg-white hover:border-myPurple hover:shadow-sm"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                className="hidden"
              />
              <IoCardOutline className="w-8 h-8" />
              <span className="text-sm font-medium">
                {t("OrderSummary.online")}
              </span>
            </label>
          </div>
        </div> */}

      {/* Checkout Button */}
      {/* <button
        onClick={() => setOpenDelete(true)}
        disabled={isPending}
        type="button"
        className="mainBtn w-full"
      >
        {isPending
          ? t("OrderSummary.loading")
          : t("OrderSummary.proceedToCheckout")}
      </button> */}

      {/* Delete Modal */}
      <ConfirmModal
        openModal={openDelete}
        onClose={() => setOpenDelete(false)}
        confirmMsg={t("OrderSummary.confirmOrderMsg")}
        onConfirm={() =>
          mutate({
            coupon_code: priceData.coupon_code,
            payment_method: "online",
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
