import { useState } from "react";
import PropTypes from "prop-types";

import { theme } from "../../theme";
import styles from "./FilterContainer.module.css";

import {
  Box,
  Button,
  Collapse,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FilterContainer({ filterNames, filterValues, setFilter, openSort }) {
  const [selectedOption, setSelectedOption] = useState("filter");
  const [open, setOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterClick = () => {
    setSelectedOption("filter");
    setOpen(!open);
  };

  const handleSortClick = () => {
    setSelectedOption("sort");
    setOpen(!open);
    openSort();
  };

  const handleClose = () => {
    setOpen(!open);
    setSelectedOption(null);
  };

  const handleSelect = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prev) => prev.filter((item) => item !== filter));
    } else {
      setSelectedFilters((prev) => [...prev, filter]);
    }
  };

  const handleFilterSelect = (filter) => {
    setFilter(filter);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mb: "10px",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "50%" }}
      >
        <Button onClick={handleFilterClick}>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ color: theme.palette.gray.main }}
          >
            <FilterAltOutlinedIcon />
            <Typography>Filter</Typography>
          </Stack>
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem />

        <Button onClick={handleSortClick}>
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ color: theme.palette.gray.main }}
          >
            <SwapVertOutlinedIcon />
            <Typography>Sort</Typography>
          </Stack>
        </Button>
      </Stack>
      <Divider sx={{ width: "80%", my: "10px" }} />
      <Collapse
        in={open}
        onClose={handleClose}
        orientation="vertical"
        sx={{ width: "80%" }}
      >
        <Box className={styles["filter-container"]}>
          <Typography sx={{ fontSize: "110%", mb: "10px" }}>
            Filter By:
          </Typography>
          {filterNames?.map((item, index) => (
            <Box key={index} className={styles["filter"]}>
              <Stack
                direction={"row"}
                spacing={1}
                className={styles["filter_heading"]}
                onClick={() => handleSelect(item)}
                sx={{ color: theme.palette.teal.main }}
              >
                {selectedFilters.includes(item) ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )}
                <Typography>{item}</Typography>
              </Stack>
              <Collapse
                in={selectedFilters.includes(item)}
                orientation="vertical"
                sx={{ ml: "10px", maxHeight: "200px", overflowY: "auto" }}
              >
                {filterValues[index]?.map((filter, index2) => (
                  <MenuItem
                    key={index2}
                    sx={{ color: theme.palette.sky_blue.main }}
                    onClick={() => handleFilterSelect(filter)}
                  >
                    <li>{filter}</li>
                  </MenuItem>
                ))}
              </Collapse>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

FilterContainer.propTypes = {
  setFilter: PropTypes.func,
  openSort: PropTypes.func,
  filterNames: PropTypes.array,
  filterValues: PropTypes.array,
};

export default FilterContainer;
