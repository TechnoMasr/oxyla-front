import Skeleton from "./Skeleton";

const NotificationsPageSkeleton = () => {
  return (
    <section>
      {/* Title */}
      <Skeleton height="h-8" width="w-48" className="mb-4" />

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height="h-8" width="w-24" rounded="rounded-full" />
        ))}
      </div>

      {/* List */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-2 p-4 mb-2 border border-gray-200 rounded-xl"
        >
          {/* Icon */}
          <Skeleton width="w-8" height="h-8" rounded="rounded-full" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            <Skeleton height="h-5" width="w-1/2" />

            {/* Body */}
            <Skeleton height="h-4" width="w-full" />
            <Skeleton height="h-4" width="w-5/6" />

            {/* Button */}
            <Skeleton height="h-6" width="w-24" rounded="rounded-full" />

            {/* Time */}
            <Skeleton height="h-3" width="w-32" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default NotificationsPageSkeleton;
