import PropTypes from "prop-types";

import styles from "./GridView.module.css";

import { Box, Grid2 } from "@mui/material";

function GridView({ data }) {
  return (
    <Box className={styles["container"]}>
      <Grid2 container sx={{ width: "80%" }}>
        <Grid2 item size={{ xs: 6, sm: 4, md: 3 }}></Grid2>
      </Grid2>
    </Box>
  );
}

GridView.protoTypes = {
  data: PropTypes.array,
};

export default GridView;
