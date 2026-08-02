import { renderStars } from "../../utils/renderStars";

const TestimonialsCard = ({ item }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-2 bg-stone-200 p-4 pb-6">
        <span className="h-18 w-18 overflow-hidden rounded-lg">
          {item.image_url && (
            <img
              loading="lazy"
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          )}
        </span>

        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-500">{item.job_title}</p>
        </div>
      </div>

      <div className="p-4 pt-6 relative">
        <div className="flex gap-1 bg-white py-1 px-2 rounded absolute left-1/2 -top-3 -translate-x-1/2">
          {renderStars(item.rating)}
        </div>

        <p className="text-sm text-gray-500 text-center max-w-md mx-auto">
          {item.paragraph}
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          className="rich_content"
        />
      </div>
    </div>
  );
};

export default TestimonialsCard;
