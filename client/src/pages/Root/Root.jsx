import { Box } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";

function Root() {
  return (
    <div>
      <Navbar />
      <Box sx={{ position: "relative" }}>
        <Sidebar />
        <Dashboard />
      </Box>
    </div>
  );
}

export default Root;
