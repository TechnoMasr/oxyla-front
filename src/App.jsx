import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import LogOutModal from "./components/modals/LogOutModal";
import RequiredLoginModal from "./components/modals/RequiredLoginModal";
import RequiredVerifyEmailModal from "./components/modals/RequiredVerifyEmailModal";
import DiscountBanner from "./components/sections/DiscountBanner";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main>
      <Header />
      <div className="min-h-[100dvh]">
        <Outlet />
      </div>
      <Footer />

      <ToastContainer />
      <DiscountBanner />

      {/* modals */}
      <LogOutModal />
      <RequiredLoginModal />
      <RequiredVerifyEmailModal />
    </main>
  );
}

export default App;
