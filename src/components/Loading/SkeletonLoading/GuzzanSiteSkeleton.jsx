import Skeleton from "./Skeleton";

const GuzzanSiteSkeleton = () => {
  return (
    <section className="relative my-16 md:my-28 mx-4 max-w-7xl lg:mx-auto rounded-3xl border overflow-hidden">
      <div className="px-6 py-12 lg:py-0 lg:h-[400px] flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
        {/* Content */}
        <div className="space-y-5 max-w-xl w-full text-center lg:text-start">
          {/* Badge */}
          <Skeleton
            width="w-36"
            height="h-8"
            rounded="rounded-full"
            className="mx-auto lg:mx-0"
          />

          {/* Title */}
          <Skeleton height="h-10" width="w-full" />
          <Skeleton height="h-10" width="w-4/5" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton />
            <Skeleton />
            <Skeleton width="w-5/6" />
          </div>

          {/* Button */}
          <Skeleton
            width="w-40"
            height="h-12"
            rounded="rounded-xl"
            className="mx-auto lg:mx-0"
          />
        </div>

        {/* Image */}
        <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
          <Skeleton
            width="w-[320px] md:w-[380px]"
            height="h-[240px] md:h-[285px]"
            rounded="rounded-2xl"
          />

          {/* Floating Card */}
          <div className="absolute bottom-4 end-4 hidden sm:block">
            <Skeleton width="w-28" height="h-16" rounded="rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuzzanSiteSkeleton;
