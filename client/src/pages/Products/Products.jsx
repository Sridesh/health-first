import { useEffect, useState } from "react";

import styles from "./Products.module.css";
import { theme } from "../../theme";

import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import tinycolor from "tinycolor2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Header from "../../components/Header/Header";
import FilterContainer from "../../components/FilterContainer/FilterContainer";

function Products() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const Card = () => (
    <Box
      className={styles["card"]}
      sx={{
        boxShadow:
          "10px 10px 5px" + tinycolor(theme.palette.blue.main).darken().toHex(),
      }}
    ></Box>
  );

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
        <Grid2 container sx={{ width: "80%" }} spacing={4}>
          {data?.map((product, index) => (
            <Grid2
              key={index}
              item
              size={{ xs: 6, sm: 4, md: 3 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                className={styles["card"]}
                sx={{
                  aspectRatio: isMobile ? "1/1.7" : "1/1.5",
                  boxShadow:
                    "0 0 5px" + tinycolor(theme.palette.bg_blue.main).darken(),
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%",
                    aspectRatio: "1/1",
                    // border: "2px solid" + theme.palette.blue.main,
                    boxShadow: "0 0 5px" + tinycolor("#fff").darken(),
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${product.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "80%",
                      aspectRatio: "1/1",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: !isMobile ? "120%" : "90%",
                        color: theme.palette.black.main,
                        fontWeight: 500,
                        mt: "5px",
                      }}
                    >
                      {product.item_name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: !isMobile ? "110%" : "80%",
                        color: theme.palette.gray.main,
                      }}
                    >
                      LKR {product.price}
                    </Typography>
                    {!isMobile && (
                      <Typography
                        sx={{
                          fontSize: "80%",
                          color: theme.palette.light_gray.main,
                        }}
                      >
                        {product.description}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Stack direction={"row"} spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ bgcolor: theme.palette.green.main, flexGrow: 1 }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: theme.palette.green.main,
                          borderColor: theme.palette.green.main,
                        }}
                      >
                        <ShoppingCartIcon />
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}

export default Products;
