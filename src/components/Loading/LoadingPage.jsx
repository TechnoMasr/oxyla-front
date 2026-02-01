import Loader from "./Loader";

const LoadingPage = () => {
  return (
    <article
      className={`h-screen flex items-center justify-center bg-gray-100 w-full`}
    >
      <Loader />
    </article>
  );
};

export default LoadingPage;
