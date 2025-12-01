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
import Footer from "../../components/layout/Footer/Footer";
import { getHome } from "../../services/homeServices";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const {
    data: homeData,
    isLoading,
  } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHome,
  });

  return (
    <article>
      <HomeLoader show={showLoader} onFinish={() => setShowLoader(false)} />

      {!showLoader && (
        <>
          <HomeHeader setOpenMenu={setOpenMenu} />
          <HomeMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

          <Hero data={homeData?.sliders} />
          <Services data={homeData?.section2} />
          <Features data={homeData?.section3} />
          <Rooms data={homeData?.section4} />
          <MedicalGrade data={homeData?.section5} />
          <Story data={homeData?.section6} />
          <FAQS data={homeData?.section7} />
          <Banner data={homeData?.section8} />
          <Footer />
        </>
      )}
    </article>
  );
};

export default Home;
