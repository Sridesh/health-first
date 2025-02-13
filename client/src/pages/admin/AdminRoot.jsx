import { Box } from "@mui/material";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminRoot() {
  return (
    <div>
      <AdminNavbar />
      <Box sx={{ position: "relative" }}>
        <Outlet />
      </Box>
    </div>
  );
}

export default AdminRoot;
