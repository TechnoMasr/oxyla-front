import { useState } from "react";
import { RxMixerHorizontal } from "react-icons/rx";
import FiltersSideBar from "./FiltersSideBar";
import { useSearchParams } from "react-router-dom";

const Filters = ({ categories }) => {
  const [active, setActive] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const FiltersBtns = [
    { label: "All", slug: "all" },
    ...(categories || []).map((cat) => ({
      label: cat.name,
      slug: cat.slug,
    })),
  ];

  const handleFilterClick = (i, slug) => {
    setActive(i);
    setSearchParams({ category: slug }); // ← تحديث URL
  };

  return (
    <section>
      <div className="flex items-center p-2 rounded-full shadow-md">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-0 border-0 p-2"
        />

        <label htmlFor="filters-drawer" className="text-2xl p-2 cursor-pointer">
          <RxMixerHorizontal />
        </label>
      </div>

      <div className="flex items-center gap-4 flex-wrap mt-4">
        {FiltersBtns.map((btn, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full shadow-md hover:brightness-90 transition cursor-pointer capitalize ${
              active === i ? "bg-myGreen text-white" : "bg-white text-black"
            }`}
            onClick={() => handleFilterClick(i, btn.slug)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <FiltersSideBar />
    </section>
  );
};

export default Filters;
