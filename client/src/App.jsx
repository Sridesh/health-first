import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DoctorsPage from "./pages/Doctors/DoctorsPage";
import Root from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import LabServices from "./pages/LabServices/LabServices";
import AllServices from "./pages/AllServices/AllServices";
import ScansPage from "./pages/ScansPage/ScansPage";
import Products from "./pages/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
