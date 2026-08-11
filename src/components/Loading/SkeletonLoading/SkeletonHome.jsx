import Skeleton from "./Skeleton";

const SkeletonHome = () => {
  return (
    <main className="">
      <section className="h-svh w-full relative mb-4">
        <div className="h-full w-full bg-white grid grid-cols-1 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="relative overflow-hidden">
              {/* Image */}
              <Skeleton
                className="absolute inset-0"
                height="h-full"
                width="w-full"
                rounded="rounded-none"
              />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center text-center space-y-3">
                <Skeleton height="h-8" width="w-2/3" />
                <Skeleton height="h-4" width="w-3/4" />
                <Skeleton height="h-10" width="w-40" rounded="rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <article className="container space-y-4">
        <section className="space-y-6">
          {/* Title */}
          <Skeleton height="h-10" width="w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton />
            <Skeleton width="w-5/6" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Skeleton width="w-32" height="h-10" rounded="rounded-full" />
            <Skeleton width="w-40" height="h-10" rounded="rounded-full" />
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-start">
              {/* Icon */}
              <Skeleton width="w-10" height="h-10" rounded="rounded-full" />

              {/* Text */}
              <div className="space-y-2 flex-1">
                <Skeleton height="h-4" width="w-3/4" />
                <Skeleton height="h-3" width="w-full" />
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border p-4 space-y-4">
              {/* Image */}
              <Skeleton height="h-40" rounded="rounded-xl" />

              {/* Title */}
              <Skeleton height="h-5" width="w-2/3" />

              {/* Description */}
              <Skeleton height="h-3" />
              <Skeleton height="h-3" width="w-5/6" />
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 items-center">
          {/* Image */}
          <Skeleton height="h-80" rounded="rounded-2xl" />

          {/* Content */}
          <div className="space-y-4">
            <Skeleton height="h-6" width="w-3/4" />
            <Skeleton />
            <Skeleton />
            <Skeleton width="w-5/6" />
          </div>
        </section>
      </article>
    </main>
  );
};

export default SkeletonHome;
