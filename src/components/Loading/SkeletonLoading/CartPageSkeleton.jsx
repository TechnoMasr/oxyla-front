import Skeleton from "./Skeleton";

const CartPageSkeleton = () => {
  return (
    <article className="container pagePadding">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton height="h-6" width="w-32" />
        <Skeleton height="h-4" width="w-20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-4 border-b border-gray-200"
            >
              {/* Image */}
              <Skeleton
                width="w-26 sm:w-32"
                height="h-26 sm:h-32"
                rounded="rounded-md"
              />

              {/* Content */}
              <div className="space-y-2 flex-1">
                {/* Title */}
                <Skeleton height="h-5" width="w-3/4" />

                {/* Location */}
                <Skeleton height="h-3" width="w-1/2" />

                {/* Date + Time */}
                <div className="flex gap-4">
                  <Skeleton height="h-3" width="w-24" />
                  <Skeleton height="h-3" width="w-20" />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Skeleton height="h-8" width="w-24" rounded="rounded-full" />
                  <Skeleton height="h-4" width="w-16" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </article>
  );
};

export default CartPageSkeleton;
