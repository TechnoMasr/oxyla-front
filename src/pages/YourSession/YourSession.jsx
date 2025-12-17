import { FaStar } from "react-icons/fa";

import bookImg from "../../assets/images/book-img.jpg";
import mapImg from "../../assets/images/Map.png";
import barImg from "../../assets/images/Group 18305.png";
import { CiLocationOn } from "react-icons/ci";

const YourSession = () => {
  return (
    <article className="container pagePadding">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Your Session</h1>

        {/* Session Card */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          <img
            loading="lazy"
            src={bookImg}
            alt="Oxylla Relax Capsule"
            className="w-full sm:w-48 h-58 sm:h-36 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-medium flex items-center gap-2">
              Oxylla Relax Capsule <FaStar className="text-yellow-400" /> 4.7
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <CiLocationOn className="text-myGreen text-xl" />
              Riyadh-King Fahd Branch
            </p>
            <p className="text-blue-600 font-semibold text-lg mt-2">$120</p>
          </div>
        </div>

        {/* Map */}
        <div className="mb-6">
          <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-sm">
            <img
              loading="lazy"
              src={mapImg}
              alt="Map"
              className="w-full h-full object-cover"
            />
            <a
              href="#"
              className="absolute top-2 right-2 text-blue-600 text-sm font-medium"
            >
              Open Map
            </a>
          </div>
        </div>

        {/* Booking Details */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-medium">Dates: </span>14 Nov 2024
          </div>
          <div>
            <span className="font-medium">Guest: </span>1 Person (Private
            Capsule)
          </div>
          <div>
            <span className="font-medium">Session Type: </span>Deep Oxygen
            Therapy
          </div>
          <div>
            <span className="font-medium">Phone: </span>0214345646
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-6">
          <img loading="lazy" src={barImg} alt="Barcode" className="mx-auto" />
          <p className="text-center text-gray-500 text-sm mt-2">
            06158310-5427-471d-af1f-bd9029b
          </p>
        </div>
      </div>
    </article>
  );
};

export default YourSession;
