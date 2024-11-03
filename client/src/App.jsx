import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DoctorsPage from "./pages/Doctors/DoctorsPage";
import Root from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";

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
        path: "/lab-services",
        element: <></>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
