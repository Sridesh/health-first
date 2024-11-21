import PropTypes from "prop-types";

import styles from "./GridView.module.css";

import { Box, Grid2 } from "@mui/material";

import Card from "../Card/Card";

function GridView({ data }) {
  return (
    <Box className={styles["container"]}>
      <Grid2 container sx={{ width: "100%" }} spacing={4}>
        {data?.map((doctor, index) => (
          <Grid2
            key={index}
            item
            size={{ xs: 6, sm: 4, md: 3 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card data={doctor} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

GridView.propTypes = {
  data: PropTypes.array,
};

export default GridView;
