import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <Navbar />
      <Box sx={{ position: "relative" }}>
        <Sidebar />
        <Outlet />
      </Box>
    </div>
  );
}

export default Root;
