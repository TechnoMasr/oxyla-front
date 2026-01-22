import { useState, useEffect } from "react";
import { RxMixerHorizontal } from "react-icons/rx";
import FiltersSideBar from "./FiltersSideBar";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchFiltersSkeleton from "../../../components/Loading/SkeletonLoading/SearchFiltersSkeleton";

const Filters = ({ categories = [], isLoading }) => {
  const [active, setActive] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");

  const { t } = useTranslation();

  const FiltersBtns = [
    { label: "All", slug: "all" },
    ...(categories || []).map((cat) => ({
      label: cat.name,
      slug: cat.slug,
    })),
  ];

  // --- عند الضغط على زر الفلتر ---
  const handleFilterClick = (i, slug) => {
    setActive(i);
    setSearchParams({ category: slug, query: search });
  };

  // --- تغير البحث داخل input ---
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // --- debounce effect ---
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ category: FiltersBtns[active].slug, query: search });
    }, 1000); // ← هنا مدة الـ debounce (500ms)

    return () => clearTimeout(timeout); // تنظيف الـ timeout عند تغيّر القيمة
  }, [search, active, FiltersBtns, setSearchParams]);

  if (isLoading) return <SearchFiltersSkeleton />;

  return (
    <section>
      <div className="flex items-center p-2 rounded-full shadow-md">
        <input
          type="text"
          placeholder={t("Search")}
          className="flex-1 outline-0 border-0 p-2"
          value={search}
          onChange={handleSearchChange}
        />

        {/* <label htmlFor="filters-drawer" className="text-2xl p-2 cursor-pointer">
          <RxMixerHorizontal />
        </label> */}
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

      {/* <FiltersSideBar /> */}
    </section>
  );
};

export default Filters;
