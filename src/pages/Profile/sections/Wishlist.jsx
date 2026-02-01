import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getWishList } from "../../../services/wishListServices";
import EmptyData from "../../../components/sections/EmptyData";
import WishListCard from "../../../components/common/WishListCard";
import AppointmentPageSkeleton from "../../../components/Loading/SkeletonLoading/AppointmentPageSkeleton";

const Wishlist = () => {
  const { t } = useTranslation();
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishList,
  });

  if (isLoading) return <AppointmentPageSkeleton />;
  return (
    <section>
      <p className="text-gray-500 font-normal mb-2 mt-1">
        ( {t("wishlistPage.itemsCount", { count: wishlist?.length || 0 })} )
      </p>

      <div>
        {wishlist?.map((item) => (
          <WishListCard key={item.id} item={item} />
        ))}
      </div>

      {wishlist?.length === 0 && <EmptyData />}
    </section>
  );
};

export default Wishlist;
