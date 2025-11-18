import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import FixedSection from "./components/sections/FixedSection";
import LoadingHome from "./components/Loading/LoadingHome";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      {/* <Header /> */}
      <div className="min-h-[calc(100dvh-315px)]">
        <Outlet />
      </div>
      <Footer />
      
      {/* <LoadingHome /> */}

      {/* <FixedSection /> */}
    </main>
  );
}

export default App;
