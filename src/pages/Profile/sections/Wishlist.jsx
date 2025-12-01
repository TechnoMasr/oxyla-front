import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getWishList } from "../../../services/wishListServices";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptyData from "../../../components/sections/EmptyData";
import WishListCard from "../../../components/common/WishListCard";

const Wishlist = () => {
  const { t } = useTranslation();
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishList,
  });

  if (isLoading) return <LoadingSection />;

  return (
    <section>
      <h2 className="text-2xl font-bold text-myPurple mb-4">
        {t("wishlistPage.title")}{" "}
        <span className="text-gray-400 text-sm font-normal">
          {t("wishlistPage.itemsCount", { count: wishlist?.length || 0 })}
        </span>
      </h2>

      {wishlist?.length === 0 && <EmptyData />}

      <div>
        {wishlist?.map((item) => (
          <WishListCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
