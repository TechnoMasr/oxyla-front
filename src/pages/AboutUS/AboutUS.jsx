import AboutBanner from "./sections/AboutBanner";
import AboutBottomSection from "./sections/AboutBottomSection";
import AboutMiddleSection from "./sections/AboutMiddleSection";
import AboutTopSection from "./sections/AboutTopSection";
import { useQuery } from "@tanstack/react-query";
import { getPages } from "../../services/mainServices";
import LoadingPage from "../../components/Loading/LoadingPage";

const AboutUS = () => {
  const {
    data: pages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pages"],
    queryFn: getPages,
  });

  if (isLoading) return <LoadingPage />;

  if (isError || !pages) return null;

  const aboutPage = pages.find((page) => page.slug === "about-us");

  return (
    <section className="space-y-8">
      <AboutBanner data={aboutPage} />
      {aboutPage?.blocks?.map((block) =>
        block.type === "counter" ? (
          <AboutMiddleSection key={block.id} data={block} />
        ) : block.type === "image_with_description_and_icons_with_titles" ? (
          <AboutTopSection key={block.id} data={block} />
        ) : (
          <AboutBottomSection key={block.id} data={block} />
        )
      )}
    </section>
  );
};

export default AboutUS;
