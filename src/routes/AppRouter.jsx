import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import VerifiedEmail from "../pages/VerifiedEmail/VerifiedEmail";
import OxylaLoading from "../components/Loading/OxylaLoading";

import Home from "../pages/Home/Home";
import AboutUS from "../pages/AboutUS/AboutUS";
import ContactUS from "../pages/ContactUS/ContactUS";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import Profile from "../pages/Profile/Profile";

import EditProfile from "../pages/Profile/sections/EditProfile";
import Notifications from "../pages/Profile/sections/Notifications";
import Appointment from "../pages/Profile/sections/Appointment";
import Wishlist from "../pages/Profile/sections/Wishlist";
import Logout from "../pages/Profile/sections/Logout";

import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

import NotFound from "../pages/NotFound/NotFound";
import AuthGuard from "../components/protectRoutes/AuthGuard";
import CheckVerifiedEmailGuard from "../components/protectRoutes/CheckVerifiedEmailGuard";
import VerifyEmailGuard from "../components/protectRoutes/VerifyEmailGuard";
import ProtectedRoute from "../components/protectRoutes/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Home />, // ← الهوم لوصفها خاص
  },

  {
    element: <App />, // ← layout للصفحات التانية
    errorElement: <ErrorPage />,
    children: [
      {
        path: "services",
        element: (
          <OxylaLoading>
            <ServicesPage />
          </OxylaLoading>
        ),
      },
      {
        path: "services/:id",
        element: (
          <OxylaLoading>
            <ServiceDetails />
          </OxylaLoading>
        ),
      },

      {
        path: "about-us",
        element: (
          <OxylaLoading>
            <AboutUS />
          </OxylaLoading>
        ),
      },
      {
        path: "contact-us",
        element: (
          <OxylaLoading>
            <ContactUS />
          </OxylaLoading>
        ),
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: (
              <OxylaLoading>
                <Profile />
              </OxylaLoading>
            ),
            children: [
              { index: true, element: <EditProfile /> },
              { path: "notifications", element: <Notifications /> },
              { path: "appointment", element: <Appointment /> },
              { path: "wishlist", element: <Wishlist /> },
              { path: "logout", element: <Logout /> },
            ],
          },
          {
            path: "payment/:status?",
            element: (
              <CheckVerifiedEmailGuard>
                <OxylaLoading>
                  <Payment />
                </OxylaLoading>
              </CheckVerifiedEmailGuard>
            ),
          },
          {
            path: "cart",
            element: (
              <CheckVerifiedEmailGuard>
                <OxylaLoading>
                  <Cart />
                </OxylaLoading>
              </CheckVerifiedEmailGuard>
            ),
          },
        ],
      },

      {
        element: <AuthGuard />,
        children: [
          {
            path: "signin",
            element: (
              <OxylaLoading>
                <Signin />
              </OxylaLoading>
            ),
          },
          {
            path: "signup",
            element: (
              <OxylaLoading>
                <Signup />
              </OxylaLoading>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <OxylaLoading>
                <ForgotPassword />
              </OxylaLoading>
            ),
          },
        ],
      },

      {
        path: "verify-email",
        element: (
          <VerifyEmailGuard>
            <OxylaLoading>
              <VerifiedEmail />
            </OxylaLoading>
          </VerifyEmailGuard>
        ),
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
