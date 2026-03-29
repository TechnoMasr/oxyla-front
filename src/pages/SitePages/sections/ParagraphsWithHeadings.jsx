const ParagraphsWithHeadings = ({ data }) => {
  return (
    <section className="container space-y-4 lg:space-y-8">
      {data?.items?.map((item) => (
        <div key={item.id}>
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: item.description }}
            className="rich_content"
          />
        </div>
      ))}
    </section>
  );
};

export default ParagraphsWithHeadings;
