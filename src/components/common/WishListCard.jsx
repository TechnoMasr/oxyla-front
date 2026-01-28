import { CiLocationOn } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toggleWishList } from "../../services/wishListServices";
import { useTranslation } from "react-i18next";
import currencyIcon from "../../assets/icons/sar-icon.svg";

const WishListCard = ({ item }) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const toggleMutation = useMutation({
    mutationFn: (payload) => toggleWishList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const handleToggle = () => {
    toggleMutation.mutate({ item_type: "service", item_id: item.id });
  };

  return (
    <div className="flex items-center gap-4 py-4 not-last:border-b border-gray-200">
      <div className="w-26 h-26 sm:w-32 sm:h-32 overflow-hidden">
        <img
          loading="lazy"
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2 flex-1">
        <div className="text-lg font-semibold flex justify-between gap-4 w-full">
          <h3 className="flex-1">{item.name}</h3>
          <p className="flex items-center gap-1">
            {item.price}{" "}
            <img src={currencyIcon} alt="currency-icon" className="w-4" />
          </p>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <CiLocationOn className="text-myGreen text-lg" />
          {item.location}
        </p>

        <div className="flex items-center gap-4">
          <Link to={`/services/${item.id}`} className="mainBtn text-sm! w-fit">
            {t("addToCart")}
          </Link>

          <button
            onClick={handleToggle}
            className="text-red-500 hover:underline cursor-pointer"
          >
            {t("remove")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
