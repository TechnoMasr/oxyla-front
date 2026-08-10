import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DiscountBanner = () => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);
  const { setting } = useSelector((state) => state.setting);

  const discountBanner = profile?.processed_orders_count === 0;
  const [visible, setVisible] = useState(true);

  if (!discountBanner || !visible) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 text-white capitalize bg-linear-to-r from-myGreen via-myBlue to-myPurple px-4 py-2 shadow-lg">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base">
            <span className="font-semibold">
              {t("discountBanner.discount", {
                discount:
                  setting?.first_order_discount &&
                  `${setting?.first_order_discount} %`,
              })}
            </span>{" "}
            {t("discountBanner.text")}
          </p>

          <Link
            to="/services"
            className="text-sm text-black font-semibold bg-white hover:bg-white/80 px-3 py-1 rounded-full transition"
          >
            {t("discountBanner.cta")}
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-xl cursor-pointer hover:bg-white/20 transition"
          aria-label={t("discountBanner.close")}
        >
          <span className="font-bold text-lg -mt-1">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;
