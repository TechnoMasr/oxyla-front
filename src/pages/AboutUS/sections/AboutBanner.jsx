const AboutBanner = ({ data }) => {
  return (
    <section
      className="w-full h-[400px] bg-no-repeat bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${data?.banner_image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
        <h2 className="text-white text-5xl lg:text-7xl font-bold text-center w-full capitalize">
          {data?.head_text}
        </h2>
      </div>
    </section>
  );
};

export default AboutBanner;
