import { createPortal } from "react-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editItemInCart } from "../../services/cartServices";

const ChangeRoomModal = ({ openModal, onClose, item }) => {
  const queryClient = useQueryClient();

  // Init with existing cart values
  const [selectedDate, setSelectedDate] = useState(item.booking_date);
  const [selectedTime, setSelectedTime] = useState(item.service_time_id);
  const [quantity, setQuantity] = useState(item.quantity);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Mutation Update
  const { mutate: updateMutate, isPending } = useMutation({
    mutationFn: (payload) => editItemInCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      onClose();
    },
  });

  const handleSubmit = () => {
    updateMutate({
      id: item.id,
      booking_date: selectedDate,
      service_time_id: selectedTime,
      quantity,
    });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className="modal modal-open" onClick={onClose}>
      <div className="modal-box space-y-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center">Change Booking</h2>

        {/* DATE PICKER */}
        <div>
          <p className="font-semibold mb-1">Select New Date</p>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded-md
                    bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-myGreen"
          />
        </div>

        {/* TIME PICKER */}
        <div>
          <p className="font-semibold mb-1">Select New Time</p>

          <div className="flex flex-wrap gap-2">
            {item.service?.times?.map((time) => (
              <label
                key={time.id}
                className={`border rounded-lg px-2 py-1 cursor-pointer text-sm ${
                  time.id === selectedTime
                    ? "bg-myGreen text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={selectedTime === time.id}
                  onChange={() => setSelectedTime(time.id)}
                />
                {time.from_time}
              </label>
            ))}
          </div>
        </div>

        {/* QUANTITY */}
        <div>
          <p className="font-semibold mb-1">Update Quantity</p>
          <div className="flex items-center justify-between gap-2 py-1 px-2 rounded-full border w-fit">
            <button onClick={decrease} className="px-2 cursor-pointer text-lg">
              -
            </button>
            <p className="font-bold w-[50px] text-center">{quantity}</p>
            <button onClick={increase} className="px-2 cursor-pointer text-lg">
              +
            </button>
          </div>
        </div>

        <button
          className="mainBtn w-full"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </dialog>,
    document.body
  );
};

export default ChangeRoomModal;
