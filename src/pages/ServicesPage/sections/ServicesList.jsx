import bookImg from "../../../assets/images/book-img.jpg";
import { CiLocationOn } from "react-icons/ci";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { renderStars } from "../../../utils/renderStars";
import { Link } from "react-router-dom";

// const services = Array.from({ length: 10 }, (_, index) => ({
//   id: index + 1,
//   image_url: bookImg,
//   name: `Fully equipped oxygen room for emergency treatment`,
//   location: `Riyadh-King Fahd Branch`,
//   rate: 4.5,
//   price: 100,
//   status: index % 2 === 0 ? "Unavailable Now" : "Available",
//   discount: index % 2 === 0 ? 20 : 0,
//   favourite: index % 2 === 0 ? false : true,
// }));

const ServicesList = ({ services }) => {
  return (
    <section>
      <h3 className="text-3xl font-bold mb-4">Most Booked Capsules</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 md:gap-16">
        {services?.map((service) => (
          <div
            key={service.id}
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="w-full h-[200px] lg:w-1/2 lg:min-h-full">
              <img
                src={service.image_url}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex-1 space-y-4">
              <h4 className="text-xl font-bold line-clamp-3">{service.name}</h4>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <CiLocationOn className="text-myGreen text-xl" />
                  {service.location}
                </p>

                <div>
                  <span className="text-sm font-bold">
                    {service.price} SAR/hour
                  </span>
                  <div className="flex gap-1">{renderStars(service.rate)}</div>
                </div>

                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm py-1 px-2 rounded-full ${
                      service.available
                        ? "bg-myGreen text-white"
                        : "bg-orange-300 text-white"
                    }`}
                  >
                    {service.available ? "Available" : "Unavailable"}
                  </p>
                  {service.discount > 0 && (
                    <span className="text-sm font-bold text-myGreen">
                      {service.discount} % off
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl cursor-pointer">
                  {service.favourite ? (
                    <IoHeart className="text-red-500" />
                  ) : (
                    <IoHeartOutline />
                  )}
                </span>
                <Link
                  to={`/services/${service.id}`}
                  className="bg-myGreen text-white px-2 py-1 rounded-full hover:brightness-90 transition cursor-pointer"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
