import FilterContainer from "../../components/FilterContainer/FilterContainer";
import Header from "../../components/Header/Header";
import styles from "./Products.module.css";

import { Box } from "@mui/material";

function Products() {
  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Medical Supplies"}
        description={
          "Discover our range of essential medical products—from medications and braces to health monitors and wellness items—designed to support your well-being and recovery needs at home. Find trusted, high-quality supplies to help you manage and improve your health with ease."
        }
      />
      <FilterContainer />
      <Box className={styles["container"]}>
        {/* <Grid2 container sx={{ width: "100%" }} spacing={4}>
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
      </Grid2> */}
      </Box>
    </Box>
  );
}

export default Products;
