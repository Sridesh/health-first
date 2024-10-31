import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <Box sx={{ position: "relative" }}>
        <Sidebar />
      </Box>
    </div>
  );
}

export default App;
