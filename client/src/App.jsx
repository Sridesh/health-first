import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { adminLoader } from "./loaders/adminLoader";
import { patientLoader } from "./loaders/patientLoader";
import { PaymentAccessProvider } from "./context/PaymentAccess";

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
import CentersPage from "./pages/Centers/CentersPage";
import Cart from "./pages/Cart/CartPage";
import InvalidEnrty from "./pages/Redirects/InvalidEnrty";
import PaymentPage from "./pages/Payment/PaymentPage";
import ProtectedPayment from "./pages/Payment/ProtectedPayment";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoot from "./pages/admin/AdminRoot";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PatientsPage from "./pages/admin/PatientsPage/PatientsPage";
import PatientInfoPage from "./pages/PatientInfo/PatientInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute requiredRoles={["patient"]}>
        <Root />
      </PrivateRoute>
    ),
    loader: patientLoader,
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
    path: "/admin",
    element: (
      <PrivateRoute requiredRoles={["admin"]}>
        <AdminRoot />
      </PrivateRoute>
    ),
    loader: adminLoader,
    children: [
      {
        element: <AdminDashboard />,
        index: true,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "patients/patient-info",
        element: <PatientInfoPage />,
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
  {
    path: "/auth/admin-login",
    element: <AdminLogin />,
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
