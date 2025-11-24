import HomeLoader from "./HomeLoader";
import { useState } from "react";
import Hero from "./sections/Hero/Hero";
import Services from "./sections/Services";
import Features from "./sections/Features";
import Rooms from "./sections/Rooms";
import MedicalGrade from "./sections/MedicalGrade";
import Story from "./sections/Story";
import FAQS from "./sections/FAQS";
import Banner from "./sections/Banner";
import HomeHeader from "./sections/HomeHeader";
import HomeMenu from "./sections/HomeMenu";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <article>
      <HomeLoader show={showLoader} onFinish={() => setShowLoader(false)} />

      {!showLoader && (
        <>
          <HomeHeader />
          <HomeMenu />
          <Hero />
          <Services />
          <Features />
          <Rooms />
          <MedicalGrade />
          <Story />
          <FAQS />
          <Banner />
        </>
      )}
    </article>
  );
};

export default Home;
