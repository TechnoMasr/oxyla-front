import { useState } from "react";
import currencyIcon from "../../../assets/icons/sar-icon.svg";

const locationsList = [
  { id: 1, name: "Riyadh" },
  { id: 2, name: "Cairo" },
  { id: 3, name: "Giza" },
];

const FiltersSideBar = () => {
  const [price, setPrice] = useState(25); // 💰 القيمة الديناميكية للسعر

  return (
    <aside className="drawer drawer-end z-50">
      <input id="filters-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="filters-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-6">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-400">
            Filters
          </h2>

          {/* Location */}
          <div>
            <h4 className="text-lg font-bold mb-1">Location</h4>
            <select className="select select-neutral rounded-full outline-none! w-full">
              {locationsList.map((location) => (
                <option key={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <h4 className="text-lg font-bold mb-1">Type</h4>
            <div className="space-y-1">
              {["All", "Private", "Accessible", "Couples"].map((type, i) => (
                <label
                  key={i}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 💰 The Price (Dynamic) */}
          <div>
            <h4 className="text-lg font-bold mb-1">The Price</h4>
            <div className="w-full max-w-xs">
              <input
                type="range"
                min={0}
                max={500}
                step={25}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="range range-sm"
              />
              <div className="flex justify-between px-2.5 mt-2 text-xs">
                {[0, 100, 200, 300, 400, 500].map((val) => (
                  <span key={val}>|</span>
                ))}
              </div>
              <div className="flex justify-between px-2.5 mt-2 text-xs text-gray-500">
                {[0, 100, 200, 300, 400, 500].map((val) => (
                  <span key={val}>${val}</span>
                ))}
              </div>

              {/* ✅ عرض القيمة الحالية */}
              <div className="mt-3 text-center font-semibold">
                Selected Price:{" "}
                <span className="text-green-600 flex items-center gap-1">
                  {price}{" "}
                  <img src={currencyIcon} alt="currency-icon" className="w-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Evaluations */}
          <div>
            <h4 className="text-lg font-bold mb-1">Evaluations</h4>
            <div className="flex items-center justify-between gap-2">
              {[5, 4, 3].map((star) => (
                <label
                  key={star}
                  className="cursor-pointer flex items-center gap-1"
                >
                  <input
                    type="radio"
                    name="rating"
                    className="radio radio-sm radio-neutral"
                  />
                  <span>{star} Stars</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSideBar;
