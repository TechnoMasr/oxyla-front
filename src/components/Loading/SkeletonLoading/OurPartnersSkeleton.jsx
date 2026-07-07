import Skeleton from "./Skeleton";

const OurPartnersSkeleton = () => {
  const skeletonItems = Array(6).fill(null);

  return (
    <section className="sectionPadding bg-gray-100 overflow-hidden animate-pulse">
      <div className="w-full space-y-4 lg:space-y-8 mx-auto px-4">
        {/* سكيلتون لعنوان القسم في المنتصف */}
        <div className="flex justify-center">
          <Skeleton className="h-7 w-40 bg-gray-200 rounded-md" />
        </div>

        {/* سكيلتون لشريط الشركاء */}
        <div className="flex items-center justify-center gap-12 md:gap-16 overflow-hidden py-2">
          {skeletonItems.map((_, index) => (
            <div
              key={index}
              className="w-36 aspect-video bg-gray-200 rounded-md shrink-0 flex items-center justify-center"
            >
              {/* اختيار اختياري: إضافة سكيلتون داخلي لو حابب */}
              <Skeleton className="w-4/5 h-3/4 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartnersSkeleton;
