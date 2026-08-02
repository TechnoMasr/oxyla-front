const PageBanner = ({ image, title }) => {
  return (
    <section
      className="w-full h-64 md:h-100 bg-no-repeat bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 pt-24">
        <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-bold text-center w-full capitalize">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default PageBanner;
