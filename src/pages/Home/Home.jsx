import WhyChooseUS from "./sections/WhyChooseUS";
import TopBookNow from "./sections/TopBookNow";
import RelaxationJourney from "./sections/RelaxationJourney";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import HomeBanner from "./sections/HomeBanner";
import Partners from "./sections/Partners";
import HomeLoader from "./HomeLoader";
import { useState } from "react";
import Hero from "./sections/Hero/Hero";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <article>
      <HomeLoader show={showLoader} onFinish={() => setShowLoader(false)} />

      {!showLoader && (
        <>
          <Hero />
          <WhyChooseUS />
          <TopBookNow />
          <RelaxationJourney />
          <Features />
          <Testimonials />
          <HomeBanner />
          <Partners />
        </>
      )}
    </article>
  );
};

export default Home;
