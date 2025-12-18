import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import PublicRoute from "../components/ProtectedRoutes/PublicRoute";
import ProtectedRoute from "../components/ProtectedRoutes/ProtectedRoute";
import VerifiedEmail from "../pages/VerifiedEmail/VerifiedEmail";
import VerifiedEmailRoute from "../components/ProtectedRoutes/VerifiedEmailRoute";
import OxylaLoading from "../components/Loading/OxylaLoading";

import Home from "../pages/Home/Home";
import AboutUS from "../pages/AboutUS/AboutUS";
import ContactUS from "../pages/ContactUS/ContactUS";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import YourSession from "../pages/YourSession/YourSession";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // ← الهوم لوصفها خاص
  },

  {
    element: <App />, // ← layout للصفحات التانية
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
        path: "cart",
        element: (
          <ProtectedRoute>
            <VerifiedEmailRoute>
              <OxylaLoading>
                <Cart />
              </OxylaLoading>
            </VerifiedEmailRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <OxylaLoading>
            <Payment />
          </OxylaLoading>
        ),
      },
      {
        path: "your-session",
        element: (
          <OxylaLoading>
            <YourSession />
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
        path: "profile",
        element: (
          <ProtectedRoute>
            <OxylaLoading>
              <Profile />
            </OxylaLoading>
          </ProtectedRoute>
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
        path: "signin",
        element: (
          <PublicRoute>
            <OxylaLoading>
              <Signin />
            </OxylaLoading>
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <OxylaLoading>
              <Signup />
            </OxylaLoading>
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <OxylaLoading>
              <ForgotPassword />
            </OxylaLoading>
          </PublicRoute>
        ),
      },
      {
        path: "verify-email",
        element: (
          <OxylaLoading>
            <VerifiedEmail />
          </OxylaLoading>
        ),
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
