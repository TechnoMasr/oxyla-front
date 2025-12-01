import { useEffect, useRef, useState } from "react";
import { renderStars } from "../../../utils/renderStars";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { LuPlus, LuMinus } from "react-icons/lu";
import { addToCart } from "../../../services/cartServices.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import "cally";
import FormError from "../../../components/form/FormError.jsx";
import { toast } from "react-toastify";
import useProtectedAction from "../../../hooks/useProtectedAction.jsx";

const DetailsSection = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const { ProtectModalUI, checkAuthBefore } = useProtectedAction();

  const callyRef = useRef(null);
  const queryClient = useQueryClient();

  // ✔ Listen for change event from <calendar-date>
  useEffect(() => {
    const callyEl = callyRef.current;
    if (callyEl) {
      const handleChange = (e) => setSelectedDate(e.target.value);
      callyEl.addEventListener("change", handleChange);
      return () => callyEl.removeEventListener("change", handleChange);
    }
  }, []);

  // ------------------ Counter -------------------
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // ------------------ Add To Cart Mutation -------------------
  const {
    mutate: addToCartMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Item added to cart");
      setErrorMessage("");
      setQuantity(1);
      setSelectedDate("");
      setSelectedTime("");
    },
  });

  const handleAddToCart = () => {
    checkAuthBefore(() => {
      if (!selectedDate || !selectedTime) {
        setErrorMessage("Please select date and time before adding to cart.");
        return;
      }

      // Clear error when request is valid
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
    <>
      {ProtectModalUI}

      <section className="space-y-6 order-2 lg:order-1">
        <div className="flex items-center gap-2">
          <p className="text-gray-500">Home</p>/
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
          <div>
            <button
              popoverTarget="cally-popover1"
              id="cally1"
              style={{ anchorName: "--cally1" }}
              className="px-2 py-1 border border-gray-500 rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              {selectedDate ? selectedDate : "Pick a date"}
            </button>

            <div
              popover="auto"
              id="cally-popover1"
              className="dropdown bg-base-100 rounded-box shadow-xl"
              style={{ positionAnchor: "--cally1" }}
            >
              <calendar-date ref={callyRef} class="cally">
                <svg
                  aria-label="Previous"
                  slot="previous"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current size-4"
                >
                  <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                </svg>
                <svg
                  aria-label="Next"
                  slot="next"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current size-4"
                >
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
                <calendar-month></calendar-month>
              </calendar-date>
            </div>
          </div>
        </div>

        {/* TIME SELECTION */}
        <div>
          <p className="text-lg mb-1 font-semibold">Appointments available</p>
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

        {/* FEATURES */}
        <div>
          <p className="text-lg mb-1 font-semibold">Included in Your Session</p>
          <div className="flex flex-wrap gap-2">
            {data?.features?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-1 text-gray-600"
              >
                <span className="w-12 h-12 overflow-hidden border-2 rounded-full">
                  <img
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

        {/* QUANTITY + ADD TO CART */}
        <div className="flex items-end gap-4">
          <div>
            <p className="text-lg mb-1 font-semibold">Number of People</p>

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
            {isPending ? "Adding..." : "Add to Cart"}
          </button>
        </div>

        <FormError errorMsg={errorMessage || error?.data?.response?.message} />
      </section>
    </>
  );
};

export default DetailsSection;
