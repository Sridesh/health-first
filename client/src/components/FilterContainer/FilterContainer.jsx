import { useState } from "react";
import PropTypes from "prop-types";

import { theme } from "../../theme";
import styles from "./FilterContainer.module.css";

import {
  Box,
  Button,
  Chip,
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
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function FilterContainer({
  isSingleFilter,
  filters,
  filterNames,
  filterValues,
  setFilter,
  sortOptions,
  getSort,
  defaultSort,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const handleFilterClick = () => {
    setSelectedOption("filter");
    setOpen(true);
  };

  const handleSortClick = () => {
    setSelectedOption("sort");
    setOpen(true);
  };

  const handleSelect = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prev) => prev.filter((item) => item !== filter));
    } else {
      setSelectedFilters((prev) => [...prev, filter]);
    }
  };

  const handleFilterSelect = (filter) => {
    if (isSingleFilter) setFilter(filter.replace(" ", "%20%"));
    else setFilter((prev) => [...prev, filter]);
  };

  const handleSortSelect = (sort, name) => {
    getSort(sort);
    setSelectedSort(name);
  };

  const closeCollapse = () => {
    setOpen(false);
  };

  const handleRemoveFilter = (filter) => {
    if (isSingleFilter) setFilter(null);
    else {
      setFilter((prev) => prev.filter((item) => item !== filter));
    }
  };

  const handleRemoveSort = () => {
    getSort(defaultSort);
    setSelectedSort("");
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
        position: "relative",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "50%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button onClick={handleFilterClick} sx={{ width: "fit-content" }}>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ color: theme.palette.gray.main }}
            >
              <FilterAltOutlinedIcon />
              <Typography>Filter</Typography>
            </Stack>
          </Button>
          <Stack direction="row" spacing={1}>
            {isSingleFilter
              ? filters && (
                  <Chip
                    sx={{
                      bgcolor: theme.palette.blue.main,
                      color: theme.palette.teal.main,
                    }}
                    label={filters}
                    onDelete={() => handleRemoveFilter(filters)}
                  />
                )
              : filters &&
                filters[0] !== null &&
                filters?.map((item, index) => (
                  <Chip
                    sx={{
                      bgcolor: theme.palette.blue.main,
                      color: theme.palette.teal.main,
                    }}
                    label={item}
                    key={index}
                    onDelete={() => handleRemoveFilter(item)}
                  />
                ))}
          </Stack>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          {selectedSort !== "" && (
            <Chip
              sx={{
                bgcolor: theme.palette.yellow.main,
                color: theme.palette.teal.main,
              }}
              label={selectedSort}
              onDelete={handleRemoveSort}
            />
          )}
        </Box>
      </Stack>
      <Divider sx={{ width: "80%", my: "10px" }} />
      <Collapse
        in={open}
        orientation="vertical"
        sx={{ width: "80%", position: "absolute", top: 50, zIndex: 1 }}
      >
        {selectedOption === "filter" && (
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
        )}
        {selectedOption === "sort" && (
          <Box className={styles["filter-container"]}>
            <Typography sx={{ fontSize: "110%", mb: "10px" }}>
              Sort By:
            </Typography>
            {sortOptions?.map((option, index) => {
              return (
                <>
                  {option?.values?.map((value, index2) => {
                    return (
                      <MenuItem
                        key={index + "." + index2}
                        sx={{ color: theme.palette.sky_blue.main }}
                        onClick={() =>
                          handleSortSelect(
                            {
                              order: option.columnName,
                              sort: value === "Ascending" ? "asc" : "desc",
                            },
                            option.option + " - " + value
                          )
                        }
                      >
                        <li>{option.option + " - " + value}</li>
                      </MenuItem>
                    );
                  })}
                </>
              );
            })}
          </Box>
        )}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ width: "100%", bgcolor: theme.palette.blue.main }}
            onClick={closeCollapse}
            variant="contained"
          >
            <KeyboardDoubleArrowUpIcon
              sx={{ color: theme.palette.teal.main }}
            />
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}

FilterContainer.propTypes = {
  isSingleFilter: PropTypes.bool,
  filters: PropTypes.array,
  setFilter: PropTypes.func,
  filterNames: PropTypes.array,
  filterValues: PropTypes.array,
  sortOptions: PropTypes.array,
  getSort: PropTypes.func,
  defaultSort: PropTypes.object,
};

export default FilterContainer;
