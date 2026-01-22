import Skeleton from "./Skeleton";

const ServicesSectionSkeleton = () => {
  return (
    <section>
      <Skeleton height="h-8" width="w-64" className="mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            {/* Image */}
            <div className="w-full h-[200px] lg:w-1/2 lg:min-h-full">
              <Skeleton height="h-full" width="w-full" rounded="rounded-none" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 space-y-4">
              {/* Title */}
              <Skeleton height="h-6" width="w-3/4" />

              {/* Location */}
              <Skeleton height="h-4" width="w-1/2" />

              {/* Price + Stars */}
              <div className="space-y-2">
                <Skeleton height="h-4" width="w-1/4" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      width="w-4"
                      height="h-4"
                      rounded="rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Status + Discount */}
              <div className="flex items-center gap-2">
                <Skeleton height="h-6" width="w-24" rounded="rounded-full" />
                <Skeleton height="h-4" width="w-16" />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-4">
                <Skeleton width="w-8" height="h-8" rounded="rounded-full" />
                <Skeleton width="w-28" height="h-8" rounded="rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ServicesSectionSkeleton;
