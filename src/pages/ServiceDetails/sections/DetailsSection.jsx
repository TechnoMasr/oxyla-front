import { useState, useRef } from "react";
import { renderStars } from "../../../utils/renderStars";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuPlus, LuMinus } from "react-icons/lu";
import { addToCart } from "../../../services/cartServices.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FormError from "../../../components/form/FormError.jsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getCartCountAct } from "../../../store/profile/profileSlice.js";
import { useDispatch } from "react-redux";
import useRequireAuth from "../../../hooks/useRequireAuth.js";
import currencyIcon from "../../../assets/icons/sar-icon.svg";
import { getAvailableTimes } from "../../../services/serviceServices.js";

const DetailsSection = ({ data }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const dateInputRef = useRef(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const requireAuth = useRequireAuth();

  const handleCustomPickerClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  const { data: availableTimes, isLoading: isTimesLoading } = useQuery({
    queryKey: ["availableTimes", data?.id, selectedDate],
    queryFn: () => getAvailableTimes(data?.id, selectedDate),
    enabled: !!data?.id && !!selectedDate,
  });

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTime("");
    // setErrorMessage(""); // 1️⃣ تفريغ الرسالة عند اختيار تاريخ جديد
  };

  const handleTimeSelect = (timeId) => {
    setSelectedTime(timeId);
    setErrorMessage(""); // 2️⃣ تفريغ الرسالة بمجرد اختيار الوقت
  };

  const {
    mutate: addToCartMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(getCartCountAct());
      toast.success(t("detailsSection.serviceAdded"));
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

  const timesList = Array.isArray(availableTimes)
    ? availableTimes
    : availableTimes?.times || [];

  return (
    <section className="space-y-6 order-2 lg:order-1">
      <div className="flex items-center gap-2">
        <p className="text-gray-500">{t("detailsSection.home")}</p>/
        <p className="font-bold">{data?.category?.name}</p>
      </div>

      <h1 className="text-2xl font-bold">{data?.name}</h1>

      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-xl flex items-center gap-1">
          {data?.price}{" "}
          <img src={currencyIcon} alt="currency-icon" className="w-4" />
        </span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">{renderStars(data?.rate)}</div>
          <p className="text-gray-500">({data?.rate})</p>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.description,
        }}
        className="rich_content"
      />

      {/* 🛠️ DATE PICKER */}
      <div className="space-y-2">
        <p className="text-lg font-semibold">{t("detailsSection.pickDate")}</p>
        <div className="relative w-full md:max-w-xs">
          <div
            onClick={handleCustomPickerClick}
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
              selectedDate
                ? "border-myGreen bg-green-50/50 shadow-sm"
                : "border-gray-200 hover:border-myGreen bg-white shadow-sm"
            }`}
          >
            <HiMiniCalendarDateRange
              className={`text-2xl transition-colors ${selectedDate ? "text-myGreen" : "text-gray-400"}`}
            />

            <div className="flex flex-col">
              {selectedDate ? (
                <>
                  <span className="text-sm text-gray-500 font-medium">
                    {t("detailsSection.selectedDateLabel")}
                  </span>
                  <span className="font-bold text-gray-800">
                    {selectedDate}
                  </span>
                </>
              ) : (
                <span className="font-medium text-gray-500">
                  {t("detailsSection.clickToSelectDate")}
                </span>
              )}
            </div>
          </div>

          <input
            ref={dateInputRef}
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="absolute pointer-events-none opacity-0 left-0 bottom-0 w-0 h-0"
          />
        </div>
      </div>

      {/* 🕒 المواعيد المتاحة */}
      {selectedDate && (
        <div>
          <p className="text-lg mb-2 font-semibold">
            {t("detailsSection.appointmentsAvailable")}
          </p>

          {isTimesLoading ? (
            <p className="text-sm text-gray-500">
              {t("detailsSection.loading")}
            </p>
          ) : timesList.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {timesList.map((time) => (
                <label
                  key={time.id}
                  className={`border rounded-lg px-3 py-1.5 cursor-pointer transition text-sm font-medium ${
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
                    onChange={() => handleTimeSelect(time.id)}
                    className="hidden"
                  />

                  {time.from_time_formatted && time.to_time_formatted ? (
                    <span dir="ltr" className="inline-flex items-center gap-1">
                      <span>{time.from_time_formatted || time.from_time}</span>
                      <span>-</span>
                      <span>{time.to_time_formatted || time.to_time}</span>
                    </span>
                  ) : (
                    <span dir="ltr">
                      {time.from_time_formatted || time.from_time}
                    </span>
                  )}
                </label>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">
              {t("detailsSection.noTimesAvailable") ||
                "لا توجد مواعيد متاحة لهذا اليوم"}
            </p>
          )}
        </div>
      )}

      {/* الميزات */}
      {data?.features?.length > 0 && (
        <div>
          <p className="text-lg mb-2 font-semibold">
            {data?.features_title || t("detailsSection.includedInSession")}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {data?.features?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center gap-2 text-gray-600"
              >
                <div className="aspect-4/3 overflow-hidden border-2 border-myGreen rounded-xl max-w-full!">
                  {item.image_url && (
                    <img
                      loading="lazy"
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p className="text-sm flex-1">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* العدد وزر الإضافة */}
      <div>
        <p className="text-lg font-semibold">
          {t("detailsSection.numberOfPeople")}
        </p>
        <p className="text-gray-500 mb-2">
          {t("detailsSection.maxNumOfPeople")}:{" "}
          <span className="font-bold">{data?.max_num_of_people}</span>
        </p>

        <div className="flex gap-2 md:gap-4">
          <div className="flex items-center justify-between gap-2 p-2 rounded-full border">
            <span className="text-xl cursor-pointer" onClick={decrease}>
              <LuMinus />
            </span>
            <p className="font-bold w-[50px] text-center">{quantity}</p>
            <span className="text-xl cursor-pointer" onClick={increase}>
              <LuPlus />
            </span>
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
      </div>

      <FormError errorMsg={errorMessage || error?.response?.data?.message} />
    </section>
  );
};

export default DetailsSection;
