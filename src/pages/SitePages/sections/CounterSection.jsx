const CounterSection = ({ data }) => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-[40px] border-myPurple h-full w-[150%]"
        style={{ borderRadius: "65% 35% 60% 40% / 68% 28% 72% 32% " }}
      />

      <div className="relative z-10 container py-30 lg:py-40">
        <h2 className="text-white text-3xl lg:text-5xl font-semibold text-center w-full max-w-lg mx-auto mb-8">
          {data?.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center group relative"
            >
              <span
                className="text-white text-3xl lg:text-4xl font-semibold text-center content-center h-30 w-[80%] mx-auto bg-transparent p-2 rounded-t-lg
              group-hover:text-black group-hover:bg-myPurple duration-300"
              >
                {item.counter}
              </span>
              <p
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 shadow-lg
              text-center text-black bg-myPurple group-hover:bg-white group-hover:-bottom-8 duration-300 w-full rounded-full font-semibold  p-2"
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
