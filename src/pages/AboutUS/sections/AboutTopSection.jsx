import { AiOutlineLike } from "react-icons/ai";

const AboutTopSection = ({ data }) => {
  return (
    <section className="sectionPadding w-full max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
      <div className="rounded-2xl overflow-hidden border-8 border-myPurple h-[300px]">
        <img
          loading="lazy"
          src={data?.image}
          alt="book"
          className="w-full h-full object-cover"
        />
      </div>

      <article className="md:col-span-2">
        <p className="text-gray-500 mb-4 lg:mb-8">{data?.description}</p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.items.map((item) => (
            <li key={item.id} className="flex items-center gap-2 group">
              <span
                className="bg-black text-myPurple text-xl rounded-full w-8 h-8 flex items-center justify-center 
              border border-black group-hover:bg-white group-hover:border-myPurple duration-300"
              >
                <AiOutlineLike />
              </span>
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default AboutTopSection;
