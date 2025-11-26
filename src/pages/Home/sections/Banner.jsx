import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  return (
    <section className="sectionPadding p-4 w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-[#1894DA] to-[#1BABBE] rounded-2xl shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
          <div className="mb-6 lg:mb-0 text-center lg:text-start text-white">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">
              {data?.titles}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>

          <Link
            to={data?.btn_url}
            className="bg-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {data?.btn} <GoArrowUpRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
