import { useSelector } from "react-redux";

import { useState } from "react";
import { Link } from "react-router-dom";

const DiscountBanner = () => {
  const { profile } = useSelector((state) => state.profile);
  const discountBanner = profile?.processed_orders_count === 0;

  const [visible, setVisible] = useState(true);

  if (!discountBanner || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 text-white capitalize bg-gradient-to-r from-myGreen via-myBlue to-myPurple px-4 py-2 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base">
            <span className="font-semibold">خصم 10%</span> على أول طلب ليك!
          </p>

          <Link
            to="/services"
            className="text-sm text-black font-semibold bg-white hover:bg-white/80 px-3 py-1 rounded-full transition"
          >
            اطلب الان
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="w-6 h-6 flex items-center justify-center rounded-full text-xl cursor-pointer hover:bg-white/20 transition"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;
