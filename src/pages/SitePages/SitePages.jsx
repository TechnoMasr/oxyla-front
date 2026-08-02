import PageBanner from "./sections/PageBanner";
import TitleWithImageSection from "./sections/TitleWithImageSection";
import CounterSection from "./sections/CounterSection";
import ImageWithDescriptionSection from "./sections/ImageWithDescriptionSection";
import { useQuery } from "@tanstack/react-query";
import { getPageContent } from "../../services/mainServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useParams } from "react-router-dom";
import ParagraphsWithHeadings from "./sections/ParagraphsWithHeadings";

const SitePages = () => {
  const { slug } = useParams();

  const {
    data: page,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pageContent", slug],
    queryFn: () => getPageContent(slug),
  });

  if (isLoading) return <LoadingPage />;

  if (isError || !page) return null;

  return (
    <main className="space-y-8">
      <PageBanner image={page?.banner_image} title={page?.head_text} />

      <section className="container">
        <div
          dangerouslySetInnerHTML={{ __html: page.content_text }}
          className="rich_content"
        />
      </section>

      {/* {page?.blocks?.map((block) =>
        block.type === "paragraphs_with_headings" ? (
          <ParagraphsWithHeadings key={block.id} data={block} />
        ) : block.type === "counter" ? (
          <CounterSection key={block.id} data={block} />
        ) : block.type === "image_with_description_and_icons_with_titles" ? (
          <ImageWithDescriptionSection key={block.id} data={block} />
        ) : (
          <TitleWithImageSection key={block.id} data={block} />
        ),
      )} */}
    </main>
  );
};

export default SitePages;
