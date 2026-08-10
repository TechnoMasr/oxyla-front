import HomeLoader from "./HomeLoader";
import { useEffect, useState } from "react";
import Hero from "./sections/Hero/Hero";
import GuzzanSite from "./sections/GuzzanSite";
import OurPartners from "./sections/OurPartners";
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
import { useDispatch } from "react-redux";
import { fetchSetting } from "../../store/setting/setting";
import { getProfileAct } from "../../store/profile/profileSlice";
import SkeletonHome from "../../components/Loading/SkeletonLoading/SkeletonHome";
import ScrollToTopBtn from "../../components/common/ScrollToTopBtn";
import DiscountBanner from "../../components/sections/DiscountBanner";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { data: homeData, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: getHome,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSetting());
    dispatch(getProfileAct());
  }, [dispatch]);

  return (
    <main>
      <article className={`min-h-dvh`}>
        <HomeLoader />

        <HomeHeader setOpenMenu={setOpenMenu} />
        <HomeMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
        <ScrollToTopBtn />

        {isLoading ? (
          <SkeletonHome />
        ) : (
          <>
            <Hero data={homeData?.sliders} />
            <Services data={homeData?.section2} />
            <Features data={homeData?.section3} />
            <Rooms data={homeData?.section4} />
            <MedicalGrade data={homeData?.section5} />
            <Banner data={homeData?.section8} />
            <Story data={homeData?.section6} />
            <FAQS data={homeData?.section7} />
            <GuzzanSite />
            <OurPartners />
          </>
        )}
      </article>
      <Footer />
      <DiscountBanner />
    </main>
  );
};

export default Home;
