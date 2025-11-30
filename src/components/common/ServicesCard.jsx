import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renderStars } from "../../utils/renderStars";
import { CiLocationOn } from "react-icons/ci";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toggleWishList } from "../../services/wishListServices";

const ServicesCard = ({ service }) => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (payload) => toggleWishList(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const handleToggle = () => {
    toggleMutation.mutate({ item_type: "service", item_id: service.id });
  };

  return (
    <div
      key={service.id}
      className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="w-full h-[200px] lg:w-1/2 lg:min-h-full">
        <img
          src={service.image_url}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 space-y-4">
        <h4 className="text-xl font-bold line-clamp-3">{service.name}</h4>

        <div className="space-y-2">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <CiLocationOn className="text-myGreen text-xl" />
            {service.location}
          </p>

          <div>
            <span className="text-sm font-bold">{service.price} SAR/hour</span>
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
              {service.available ? "Available" : "Unavailable"}
            </p>
            {service.discount > 0 && (
              <span className="text-sm font-bold text-myGreen">
                {service.discount} % off
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-3xl cursor-pointer" onClick={handleToggle}>
            {service?.favorites_count ? (
              <IoHeart className="text-red-500" />
            ) : (
              <IoHeartOutline />
            )}
          </span>

          <Link
            to={`/services/${service.id}`}
            className="bg-myGreen text-white px-2 py-1 rounded-full hover:brightness-90 transition cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
