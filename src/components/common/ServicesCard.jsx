import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renderStars } from "../../utils/renderStars";
import { CiLocationOn } from "react-icons/ci";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toggleWishList } from "../../services/wishListServices";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useRequireAuth from "../../hooks/useRequireAuth";
import currencyIcon from "../../assets/icons/sar-icon.svg";

const ServicesCard = ({ service }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const requireAuth = useRequireAuth();

  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(
    service?.favorites_count ? true : false,
  );

  const toggleMutation = useMutation({
    mutationFn: (payload) => toggleWishList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
    onError: () => {
      // لو في خطأ، نرجع الحالة القديمة
      setIsFavourite((prev) => !prev);
    },
  });

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    requireAuth(() => {
      // تغير الحالة فورًا في الواجهة
      setIsFavourite((prev) => !prev);

      toggleMutation.mutate({
        item_type: "service",
        item_id: service.id,
      });
    });
  };

  return (
    <div
      onClick={() => navigate(`/services/${service.id}`)}
      key={service.id}
      className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="w-full h-[200px] lg:w-1/2 lg:min-h-full">
        {service.image_url && (
          <img
            loading="lazy"
            src={service.image_url}
            alt={service.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-4">
        <h4 className="text-xl font-bold line-clamp-3">{service.name}</h4>

        <div className="space-y-2">
        {service.location &&  <p className="text-sm text-gray-500 flex items-center gap-1">
            <CiLocationOn className="text-myGreen text-xl" />
            {service.location}
          </p>}

          <div>
            <span className="text-lg font-bold flex items-center gap-1">
              {service.price}{" "}
              <img src={currencyIcon} alt="currency-icon" className="w-4" />
            </span>
            <div className="flex gap-1">{renderStars(service.rate)}</div>
          </div>

          <div className="flex items-center gap-2">
            <p
              className={`text-sm py-1 px-2 rounded-full ${
                service.available
                  ? "bg-green-400 text-white"
                  : "bg-orange-300 text-white"
              }`}
            >
              {service.available ? t("available") : t("unavailable")}
            </p>
            {service.discount > 0 && (
              <span className="text-sm font-bold text-myGreen">
                {service.discount} % off
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mt-auto">
          <span className="text-3xl cursor-pointer" onClick={handleToggle}>
            {isFavourite ? (
              <IoHeart className="text-red-500" />
            ) : (
              <IoHeartOutline />
            )}
          </span>

          <Link
            to={`/services/${service.id}`}
            className="bg-myGreen text-white px-2 py-1 rounded-full hover:brightness-90 transition cursor-pointer"
          >
            {t("bookNow")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
