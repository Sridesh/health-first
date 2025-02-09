import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import DoctorsPage from "./pages/Doctors/DoctorsPage";
import Root from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import LabServices from "./pages/LabServices/LabServices";
import AllServices from "./pages/AllServices/AllServices";
import ScansPage from "./pages/ScansPage/ScansPage";
import Products from "./pages/Products/Products";
import Checkups from "./pages/Checkups/Checkups";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Dev from "./dev";
import Test from "./test";
import UnauthorizedScreen from "./components/UI/UnauthorizedScreen";
import { AuthProvider } from "./context/AuthContext";
import api from "./api/api";
import CentersPage from "./pages/Centers/CentersPage";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart/CartPage";
import InvalidEnrty from "./pages/Redirects/InvalidEnrty";
import PaymentPage from "./pages/Payment/PaymentPage";
import ProtectedPayment from "./pages/Payment/ProtectedPayment";
import { PaymentAccessProvider } from "./context/PaymentAccess";

const protectedLoader = async () => {
  try {
    await api.get("auth-patient/me");
    return null;
  } catch (error) {
    console.log(error);

    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: protectedLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/doctors",
        element: <DoctorsPage />,
      },
      {
        path: "/services",
        element: <AllServices />,
      },
      {
        path: "/centres",
        element: <CentersPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/purchases-payment",
        element: (
          <ProtectedPayment>
            <PaymentPage />,
          </ProtectedPayment>
        ),

        // loader: paymentLoader,
      },
      {
        path: "/services/lab-services",
        element: <LabServices />,
      },
      {
        path: "/services/scans",
        element: <ScansPage />,
      },
      {
        path: "/services/medical-products",
        element: <Products />,
      },
      {
        path: "/services/health-checkups",
        element: <Checkups />,
      },
      {
        path: "/dev",
        element: <Dev />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedScreen />,
  },
  {
    path: "/invalid-redirect",
    element: <InvalidEnrty />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PaymentAccessProvider>
          <RouterProvider router={router} />;
        </PaymentAccessProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
