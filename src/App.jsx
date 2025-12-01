import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import PagesLoading from "./components/Loading/PagesLoading";
import { ToastContainer } from "react-toastify";

function App() {
  const { pathname } = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setShowLoader(false);
  }, [pathname]);

  return (
    <main>
      <PagesLoading
        key={pathname}
        show={showLoader}
        onFinish={() => setShowLoader(false)}
      />

      {!showLoader && (
        <>
          <Header />
          <div className="min-h-[100dvh]">
            <Outlet />
          </div>
          <Footer />
        </>
      )}

      <ToastContainer />
    </main>
  );
}

export default App;
