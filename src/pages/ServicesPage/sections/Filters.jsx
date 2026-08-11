import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchFiltersSkeleton from "../../../components/Loading/SkeletonLoading/SearchFiltersSkeleton";
import { IoIosSearch } from "react-icons/io";

const Filters = ({ categories = [], isLoading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");

  const currentCategory = searchParams.get("category") || "all";
  const { t } = useTranslation();
  const isFirstRender = useRef(true);

  const FiltersBtns = [
    { label: "All", slug: "all" },
    ...(categories || []).map((cat) => ({
      label: cat.name,
      slug: cat.slug,
    })),
  ];

  const activeIndex = FiltersBtns.findIndex(
    (btn) => btn.slug === currentCategory,
  );
  const active = activeIndex !== -1 ? activeIndex : 0;

  // 1. دالة ذكية لتحديث الـ URL وتنظيفه من القيم الافتراضية أو الفاضية
  const updateURL = (category, queryValue) => {
    const params = {};

    // لو الـ category مش "all"، ضيفها في الـ URL
    if (category && category !== "all") {
      params.category = category;
    }

    // لو السيرش مش فاضي (بعد مسح المسافات)، ضيفه في الـ URL
    if (queryValue && queryValue.trim() !== "") {
      params.query = queryValue;
    }

    setSearchParams(params);
  };

  // --- عند الضغط على زر الفلتر ---
  const handleFilterClick = (slug) => {
    updateURL(slug, search);
  };

  // --- تغير البحث داخل input ---
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // --- debounce effect للبحث ---
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      updateURL(currentCategory, search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search, currentCategory]);

  if (isLoading) return <SearchFiltersSkeleton />;

  return (
    <section>
      <div className="flex items-center py-2 px-4 rounded-full shadow-md">
        <span className="text-2xl text-gray-500 border-e pe-2">
          <IoIosSearch />
        </span>

        <input
          type="text"
          placeholder={t("Search")}
          className="flex-1 outline-0 border-0 p-2"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex items-center gap-2 lg:gap-4 flex-wrap mt-4">
        {FiltersBtns.map((btn, i) => (
          <button
            key={i}
            className={`px-2 py-1 lg:px-4 lg:py-2 text-sm lg:text-base rounded-full shadow-md hover:brightness-90 transition cursor-pointer capitalize ${
              active === i ? "bg-myGreen text-white" : "bg-white text-black"
            }`}
            onClick={() => handleFilterClick(btn.slug)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Filters;
