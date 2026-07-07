import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="sectionPadding container">
      <div className="bg-linear-to-r from-[#1894DA] to-[#1BABBE] rounded-2xl shadow-lg container">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-8 lg:py-16">
          <div className="text-center lg:text-start text-white flex-1">
            <h2 className="text-xl lg:text-3xl font-bold uppercase mb-4">
              {data?.titles}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="text-lg rich_content"
            />
          </div>

          <Link
            to={data?.btn_url}
            className="bg-white font-semibold text-lg lg:text-xl px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {data?.btn} <GoArrowUpRight className="text-lg rtl:rotate-270" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
