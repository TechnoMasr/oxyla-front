import { createPortal } from "react-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { rateBooking } from "../../services/bookingServices";

const RateModal = ({ openModal, onClose, bookingId }) => {
  const queryClient = useQueryClient();

  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  // --- Mutation ---
  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => rateBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      onClose();
    },
  });

  const handleSubmit = () => {
    mutate({
      booking_id: bookingId,
      rate,
      rate_comment: comment,
    });
  };

  if (!openModal) return null;

  return createPortal(
    <dialog className={`modal modal-open`} onClick={onClose}>
      <div className="modal-box space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg text-center">Rate this service</h3>

        {/* STAR RATING */}
        <div className="flex justify-center gap-2 text-3xl my-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRate(star)}
              className={`cursor-pointer transition ${
                star <= rate ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* NOTES INPUT */}
        <div>
          <label className="mb-1 text-sm font-medium block" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-sm bg-white outline-none border-none p-2 rounded ring-1
            transition-all ring-gray-400 focus-within:ring-myGreen focus-within:ring-2
            min-h-26 max-h-52"
          />
        </div>

        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn bg-red-700 text-white rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="mainBtn"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Rate"}
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  );
};

export default RateModal;
