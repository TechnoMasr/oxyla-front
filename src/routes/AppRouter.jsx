import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";

const Home = React.lazy(() => import("../pages/Home/Home"));
const AboutUS = React.lazy(() => import("../pages/AboutUS/AboutUS"));
const ContactUS = React.lazy(() => import("../pages/ContactUS/ContactUS"));
const ServicesPage = React.lazy(() =>
  import("../pages/ServicesPage/ServicesPage")
);
const ServiceDetails = React.lazy(() =>
  import("../pages/ServiceDetails/ServiceDetails")
);
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Payment = React.lazy(() => import("../pages/Payment/Payment"));
const YourSession = React.lazy(() =>
  import("../pages/YourSession/YourSession")
);
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const EditProfile = React.lazy(() =>
  import("../pages/Profile/sections/EditProfile")
);
const Notifications = React.lazy(() =>
  import("../pages/Profile/sections/Notifications")
);
const Appointment = React.lazy(() =>
  import("../pages/Profile/sections/Appointment")
);
const Wishlist = React.lazy(() => import("../pages/Profile/sections/Wishlist"));
const Logout = React.lazy(() => import("../pages/Profile/sections/Logout"));

const Signin = React.lazy(() => import("../pages/Signin/Signin"));
const Signup = React.lazy(() => import("../pages/Signup/Signup"));
const ForgotPassword = React.lazy(() =>
  import("../pages/ForgotPassword/ForgotPassword")
);

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        children: [
          { index: true, element: <Home /> },
          { path: "services", element: <ServicesPage /> },
          { path: "services/:id", element: <ServiceDetails /> },
          { path: "cart", element: <Cart /> },
          { path: "payment", element: <Payment /> },
          { path: "your-session", element: <YourSession /> },
          { path: "about-us", element: <AboutUS /> },
          { path: "contact-us", element: <ContactUS /> },

          {
            path: "profile",
            element: <Profile />,
            children: [
              { index: true, element: <EditProfile /> },
              { path: "notifications", element: <Notifications /> },
              { path: "appointment", element: <Appointment /> },
              { path: "wishlist", element: <Wishlist /> },
              { path: "logout", element: <Logout /> },
            ],
          },

          { path: "signin", element: <Signin /> },
          { path: "signup", element: <Signup /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

// const AppRouter = () => {
//   return (
//     <Suspense fallback={<LoadingPage />}>
//       <RouterProvider router={router} />
//     </Suspense>
//   );
// };

export default AppRouter;
