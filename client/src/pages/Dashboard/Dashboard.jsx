import { Box } from "@mui/material";

import styles from "./Dashboard.module.css";
import AdCarousel from "../../components/AdCarousel/AdCarousel";

function Dashboard() {
  return (
    <Box className={styles["container"]}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <AdCarousel />
      </Box>
    </Box>
  );
}

export default Dashboard;
