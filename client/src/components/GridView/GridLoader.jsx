import CardLoader from "../Card/CardLoader";
import styles from "./GridView.module.css";

import { Box, Grid2 } from "@mui/material";

function GridLoader() {
  return (
    <Box ariaLabel="grid-loader" className={styles["container"]}>
      <Grid2 container sx={{ width: "100%" }} spacing={4}>
        {[1, 2, 3, 4, 5, 6, 7].map((doctor, index) => (
          <Grid2
            key={index}
            item
            size={{ xs: 6, sm: 4, md: 3 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CardLoader />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default GridLoader;
