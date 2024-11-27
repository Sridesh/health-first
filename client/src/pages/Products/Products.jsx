import { useEffect, useState } from "react";

import styles from "./Products.module.css";
import { theme } from "../../theme";

import {
  Box,
  Button,
  Grid2,
  Skeleton,
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

  const [searchString, setSearchString] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const [filterList, setFilterList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState({
    order: "item_name",
    sort: "asc",
  });

  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = `
        http://localhost:3001/products?availability=${
          selectedFilters
            ?.find((item) => item.includes("Availability"))
            ?.split("--")[0] || null
        }&category=${
          selectedFilters
            ?.find((item) => item.includes("Category"))
            ?.split("--")[0] || null
        }&order=${selectedSort.order || "item_name"}&sort=${selectedSort.sort}`;
        const response = await axios.get(url);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [selectedFilters, selectedSort.order, selectedSort.sort]);

  useEffect(() => {
    setSearchedData(() => {
      if (searchString === "") return data;
      else {
        return data.filter((item) =>
          item.item_name.toLowerCase().includes(searchString)
        );
      }
    });
  }, [data, searchString]);

  useEffect(() => {
    const tempList = [...new Set(data.map((product) => product.category))];

    if (tempList.length > filterList.length) setFilterList(tempList);
  }, [data, filterList]);

  console.log("hello");

  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Medical Supplies"}
        description={
          "Discover our range of essential medical products—from medications and braces to health monitors and wellness items—designed to support your well-being and recovery needs at home. Find trusted, high-quality supplies to help you manage and improve your health with ease."
        }
        onChange={setSearchString}
      />
      <FilterContainer
        filters={selectedFilters}
        setFilter={setSelectedFilters}
        filterNames={["Availability", "Category"]}
        filterValues={[["Currently Available", "Limited Stocks"], filterList]}
        sortOptions={[
          {
            option: "Name",
            values: ["Ascending", "Descending"],
            columnName: "item_name",
          },
          {
            option: "Price",
            values: [
              { label: "Lowest to Highest", value: "Ascending" },
              { label: "Highest to Lowest", value: "Descending" },
            ],
            columnName: "price",
          },
        ]}
        getSort={setSelectedSort}
        defaultSort={{
          option: "Name",
          values: ["Ascending", "Descending"],
          column_name: "item_name",
        }}
        sx={{ mt: "40px", mb: 0 }}
      />
      <Box className={styles["container"]}>
        <Grid2 container sx={{ width: "90%", py: "10px" }} spacing={4}>
          {isLoading
            ? [1, 2, 3, 4, 5].map((item) => (
                <Grid2
                  key={item}
                  item
                  size={{ xs: 6, sm: 4, md: 3 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    className={styles["card"]}
                    sx={{
                      aspectRatio: isTab ? "1/1.7" : "1/1.5",
                      boxShadow:
                        "0 0 5px" +
                        tinycolor(theme.palette.bg_blue.main).darken(),
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "90%",
                        aspectRatio: "1/1",
                        borderRadius: "10px",
                      }}
                    >
                      <Skeleton sx={{ width: "100%", height: "100%" }} />
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
                        <Skeleton
                          sx={{
                            height: "20px",
                            mt: "5px",
                          }}
                        />
                        <Skeleton
                          sx={{
                            height: "20px",
                            mt: "5px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          mt: "10px",
                        }}
                      >
                        <Stack
                          direction={isMobile ? "column" : "row"}
                          spacing={1}
                        >
                          <Skeleton
                            sx={{
                              bgcolor: theme.palette.green.main,
                              flexGrow: 1,
                            }}
                          />
                          <Skeleton
                            sx={{
                              color: theme.palette.green.main,
                              flexGrow: 1,
                            }}
                          />
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Grid2>
              ))
            : searchedData?.map((product, index) => (
                <Grid2
                  key={index}
                  item
                  size={{ xs: 6, sm: 4, md: 3 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    className={styles["card"]}
                    sx={{
                      aspectRatio: isTab ? "1/1.7" : "1/1.5",
                      boxShadow:
                        "0 0 5px" +
                        tinycolor(theme.palette.bg_blue.main).darken(),
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
                            fontSize: !isTab ? "120%" : "90%",
                            color: theme.palette.black.main,
                            fontWeight: 500,
                            mt: "5px",
                          }}
                        >
                          {product.item_name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: !isTab ? "110%" : "80%",
                            color: theme.palette.gray.main,
                          }}
                        >
                          LKR {product.price}
                        </Typography>
                        {!isTab && (
                          <Typography
                            sx={{
                              fontSize: "90%",
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
                          mt: "10px",
                        }}
                      >
                        <Stack
                          direction={isMobile ? "column" : "row"}
                          spacing={1}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            sx={{
                              bgcolor: theme.palette.green.main,
                              flexGrow: 1,
                            }}
                          >
                            Buy Now
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
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
