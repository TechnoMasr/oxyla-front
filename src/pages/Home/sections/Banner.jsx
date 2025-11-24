import { GoArrowUpRight } from "react-icons/go";

const Banner = () => {
  return (
    <section className="sectionPadding container">
      <div className="bg-gradient-to-r from-[#1894DA] to-[#1BABBE] rounded-2xl shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
          <div className="mb-6 lg:mb-0 text-center lg:text-start text-white">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">
              Ready to Experience Healing?
            </h2>
            <p className="text-sm lg:text-base max-w-lg">
              Book your oxygen session or room in minutes. Our team will contact
              you to confirm your preferred time.
            </p>
          </div>

          <button className="bg-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer">
            Reserve Your Session <GoArrowUpRight className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
