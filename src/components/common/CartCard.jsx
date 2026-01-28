import { CiLocationOn } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import ConfirmModal from "../modals/ConfirmModal";
import ChangeRoomModal from "../modals/ChangeRoomModal";
import RateModal from "../modals/RateModal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../../services/cartServices";
import { renderStars } from "../../utils/renderStars";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getCartCountAct } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";
import currencyIcon from "../../assets/icons/sar-icon.svg";

const CartCard = ({ item, orders = false }) => {
  const { t } = useTranslation();
  const [openDelete, setOpenDelete] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [openRate, setOpenRate] = useState(false);

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  // Delete Mutation
  const { mutate: removeMutate, isPending } = useMutation({
    mutationFn: () => removeFromCart(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      dispatch(getCartCountAct());

      setOpenDelete(false);
      toast.success(t("CartCard.itemRemoved"));
    },
  });

  return (
    <div className="flex items-center gap-4 py-4 not-last:border-b border-gray-200">
      <div className="w-26 h-26 sm:w-32 sm:h-32 overflow-hidden">
        <img
          loading="lazy"
          src={item.service?.image_url}
          alt={item.service?.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2 flex-1">
        <div className="text-lg font-semibold flex justify-between gap-4 w-full">
          <h3 className="flex-1 flex flex-wrap items-center gap-1">
            {item.service?.name}{" "}
            <span className="font-normal">
              {item.quantity > 1 && `(x${item.quantity})`}
            </span>
          </h3>
          {orders && (
            <p className="flex items-center gap-1">
              {item.price}{" "}
              <img src={currencyIcon} alt="currency-icon" className="w-4" />
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <CiLocationOn className="text-myGreen text-lg" />
          {item.service?.location}
        </p>

        <div className="flex items-center gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <LuCalendarDays className="text-myGreen text-sm" />
            {item.booking_date}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <IoMdTime className="text-myGreen text-sm" />
            {item.from_time}
          </p>
        </div>

        {orders ? (
          item.rate ? (
            <div className="flex gap-1">{renderStars(item?.rate)}</div>
          ) : (
            <button
              onClick={() => setOpenRate(true)}
              className="mainBtn text-sm!"
            >
              {t("CartCard.rateNow")}
            </button>
          )
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenChange(true)}
              className="mainBtn text-sm!"
            >
              {t("CartCard.change")}
            </button>

            <button
              onClick={() => setOpenDelete(true)}
              className="text-red-500 hover:underline cursor-pointer"
            >
              {t("CartCard.remove")}
            </button>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        openModal={openDelete}
        onClose={() => setOpenDelete(false)}
        confirmMsg={t("CartCard.deleteConfirmation")}
        onConfirm={() => removeMutate()}
        disabled={isPending}
        btnText={isPending ? t("CartCard.removing") : t("CartCard.confirm")}
      />

      {/* Change Modal */}
      <ChangeRoomModal
        openModal={openChange}
        onClose={() => setOpenChange(false)}
        item={item}
      />

      {/* Rate Modal */}
      <RateModal
        openModal={openRate}
        onClose={() => setOpenRate(false)}
        bookingId={item.id}
      />
    </div>
  );
};

export default CartCard;
