import { useState } from "react";
import { renderStars } from "../../../utils/renderStars";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuPlus, LuMinus } from "react-icons/lu";
import { addToCart } from "../../../services/cartServices.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormError from "../../../components/form/FormError.jsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getCartCountAct } from "../../../store/profile/profileSlice.js";
import { useDispatch } from "react-redux";
import useRequireAuth from "../../../hooks/useRequireAuth.js";

const DetailsSection = ({ data }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const requireAuth = useRequireAuth();

  const {
    mutate: addToCartMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(getCartCountAct());
      toast.success(t("detailsSection.addToCart"));
      setErrorMessage("");
      setQuantity(1);
      setSelectedDate("");
      setSelectedTime("");
    },
  });

  const handleAddToCart = () => {
    requireAuth(() => {
      if (!selectedDate || !selectedTime) {
        setErrorMessage(t("detailsSection.selectDateTimeError"));
        return;
      }
      setErrorMessage("");
      addToCartMutate({
        service_id: data?.id,
        quantity,
        booking_date: selectedDate,
        service_time_id: selectedTime,
      });
    });
  };

  return (
    <section className="space-y-6 order-2 lg:order-1">
      <div className="flex items-center gap-2">
        <p className="text-gray-500">{t("detailsSection.home")}</p>/
        <p className="font-bold">{data?.category?.name}</p>
      </div>

      <h1 className="text-2xl font-bold">{data?.name}</h1>

      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-xl">{data?.price} $</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">{renderStars(data?.rate)}</div>
          <p className="text-gray-500">({data?.rate})</p>
        </div>
      </div>

      <p className="text-gray-500">{data?.description}</p>

      {/* DATE PICKER */}
      <div className="flex items-center gap-2">
        <HiMiniCalendarDateRange className="text-3xl text-myGreen" />
        <input
          type="date"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-2 py-1 border border-gray-500 rounded-md hover:bg-gray-100 transition cursor-pointer"
        />
      </div>

      {/* TIME SELECTION */}
      {data?.times.length > 0 && (
        <div>
          <p className="text-lg mb-1 font-semibold">
            {t("detailsSection.appointmentsAvailable")}
          </p>
          <div className="flex flex-wrap gap-2">
            {data?.times?.map((time) => (
              <label
                key={time.id}
                className={`border rounded-lg px-1 py-0.5 cursor-pointer transition text-sm font-medium ${
                  time.id === selectedTime
                    ? "bg-myGreen text-white border-myGreen"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  name="available_time"
                  value={time.id}
                  checked={selectedTime === time.id}
                  onChange={() => setSelectedTime(time.id)}
                  className="hidden"
                />
                {time.from_time}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      {data?.features.length > 0 && (
        <div>
          <p className="text-lg mb-1 font-semibold">
            {t("detailsSection.includedInSession")}
          </p>
          <div className="flex flex-wrap gap-2">
            {data?.features?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-1 text-gray-600"
              >
                <span className="w-12 h-12 overflow-hidden border-2 rounded-full">
                  <img
                    loading="lazy"
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </span>
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUANTITY + ADD TO CART */}
      <div className="flex items-end gap-4">
        <div>
          <p className="text-lg mb-1 font-semibold">
            {t("detailsSection.numberOfPeople")}
          </p>
          <div className="flex items-center justify-between gap-2 p-2 rounded-full border">
            <span className="text-xl cursor-pointer" onClick={decrease}>
              <LuMinus />
            </span>
            <p className="font-bold w-[50px] text-center">{quantity}</p>
            <span className="text-xl cursor-pointer" onClick={increase}>
              <LuPlus />
            </span>
          </div>
        </div>

        <button
          className="mainBtn rounded-full!"
          disabled={isPending}
          onClick={handleAddToCart}
        >
          {isPending
            ? t("detailsSection.adding")
            : t("detailsSection.addToCart")}
        </button>
      </div>

      <p>
        {t("detailsSection.maxNumOfPeople")}: {data?.max_num_of_people}
      </p>

      <FormError errorMsg={errorMessage || error?.response?.data?.message} />
    </section>
  );
};

export default DetailsSection;
