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
    </Box>
  );
}

export default Products;
