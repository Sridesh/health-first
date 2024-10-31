import { Box } from "@mui/material";

import styles from "./Dashboard.module.css";
import ServicesGrid from "../SerivcesGrid/ServicesGrid";

function Dashboard() {
  return (
    <Box className={styles["container"]}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ServicesGrid />
      </Box>
    </Box>
  );
}

export default Dashboard;
