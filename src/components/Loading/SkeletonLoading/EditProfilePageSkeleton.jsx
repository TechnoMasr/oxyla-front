import Skeleton from "./Skeleton";

const EditProfilePageSkeleton = () => {
  return (
    <section>
      {/* Title */}
      <Skeleton height="h-8" width="w-56" className="mb-4" />

      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Skeleton width="w-12" height="h-12" rounded="rounded-full" />

          <div className="space-y-2">
            <Skeleton height="h-4" width="w-32" />
            <Skeleton height="h-3" width="w-40" />
          </div>
        </div>

        {/* Edit button */}
        <Skeleton height="h-8" width="w-24" rounded="rounded-lg" />
      </div>

      <div className="bg-gray-100">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 p-2 border-b border-gray-300 items-center"
          >
            {/* Label */}
            <Skeleton height="h-4" width="w-32" className="col-span-2" />

            {/* Input */}
            <Skeleton height="h-4" width="w-full" className="col-span-3" />
          </div>
        ))}

        {/* Save button */}
        <div className="my-6">
          <Skeleton height="h-10" width="w-40" rounded="rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default EditProfilePageSkeleton;
