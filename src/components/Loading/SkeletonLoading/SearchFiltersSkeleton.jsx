import Skeleton from "./Skeleton";

const SearchFiltersSkeleton = () => {
  return (
    <section>
      {/* Search Input */}
      <div className="flex items-center p-2 rounded-full shadow-md">
        <Skeleton height="h-10" width="w-full" rounded="rounded-full" />
      </div>

      {/* Filters Buttons */}
      <div className="flex items-center gap-4 flex-wrap mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height="h-10" width="w-24" rounded="rounded-full" />
        ))}
      </div>
    </section>
  );
};

export default SearchFiltersSkeleton;
