import { useEffect, useState } from "react";
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
  useMediaQuery,
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
  sx,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedFilterNames, setSelectedFilterNames] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState([]);
  const [selectedSingleFilter, setSelectedSingleFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isSingleFilter) {
      setFilter(
        selectedSingleFilter
          ? selectedSingleFilter.replaceAll(" ", "%20%")
          : null
      );
    } else {
      setFilter(
        selectedFilterValues.map((filter) => filter.replaceAll(" ", "%20%"))
      );
    }
  }, [isSingleFilter, selectedFilterValues, selectedSingleFilter, setFilter]);

  const handleFilterClick = () => {
    setSelectedOption("filter");
    setOpen(true);
  };

  const handleSortClick = () => {
    setSelectedOption("sort");
    setOpen(true);
  };

  const handleSelect = (filter) => {
    if (selectedFilterNames.includes(filter)) {
      setSelectedFilterNames((prev) => prev.filter((item) => item !== filter));
    } else {
      setSelectedFilterNames((prev) => [...prev, filter]);
    }
  };

  const handleFilterSelect = (filter, filterName) => {
    if (isSingleFilter) setSelectedSingleFilter(filter);
    else {
      if (selectedFilterValues.length === 0) {
        setSelectedFilterValues([filter + "--" + filterName]);
      } else {
        const tempArray = [...selectedFilterValues];

        const isIncluded = tempArray.some((item, index) => {
          if (item.includes(filterName)) {
            tempArray[index] = filter + "--" + filterName;
            return true;
          }
          return false;
        });

        if (isIncluded) {
          setSelectedFilterValues(tempArray);
        } else {
          setSelectedFilterValues((prev) => [
            ...prev,
            filter + "--" + filterName,
          ]);
        }
      }
    }

    closeCollapse();
  };

  const handleSortSelect = (sort, name) => {
    getSort(sort);
    setSelectedSort(name);
    closeCollapse();
  };

  const closeCollapse = () => {
    setOpen(false);
    setSelectedOption("");
  };

  const handleRemoveFilter = (filter) => {
    if (isSingleFilter) setSelectedSingleFilter(null);
    else {
      setSelectedFilterValues((prev) => prev.filter((item) => item !== filter));
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
        ...sx,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ width: "85%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            maxWidth: "50%",
            overflowX: "auto",
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
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: "100%", overflowX: "auto", justifyContent: "center" }}
          >
            {isSingleFilter
              ? filters && (
                  <Chip
                    sx={{
                      bgcolor: theme.palette.blue.main,
                      color: theme.palette.teal.main,
                      fontSize: isMobile ? "70%" : "100%",
                    }}
                    label={
                      filters !== null ? filters?.replaceAll("%20%", " ") : ""
                    }
                    onDelete={() => handleRemoveFilter(filters)}
                  />
                )
              : selectedFilterValues &&
                selectedFilterValues[0] !== null &&
                selectedFilterValues?.map((item, index) => (
                  <Chip
                    sx={{
                      bgcolor: theme.palette.blue.main,
                      color: theme.palette.teal.main,
                      fontSize: isMobile ? "70%" : "100%",
                    }}
                    label={item.split("--")[0].replaceAll("%20%", " ")}
                    key={index}
                    onDelete={() => handleRemoveFilter(item)}
                  />
                ))}
          </Stack>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            maxWidth: "50%",
            overflowX: "auto",
          }}
        >
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
                fontSize: isMobile ? "70%" : "100%",
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
            {filterNames?.map((filterName, index) => (
              <Box key={index} className={styles["filter"]}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  className={styles["filter_heading"]}
                  onClick={() => handleSelect(filterName)}
                  sx={{ color: theme.palette.teal.main }}
                >
                  {selectedFilterNames.includes(filterName) ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                  <Typography>{filterName}</Typography>
                </Stack>
                <Collapse
                  in={selectedFilterNames.includes(filterName)}
                  orientation="vertical"
                  sx={{ ml: "10px", maxHeight: "200px", overflowY: "auto" }}
                >
                  {filterValues[index]?.map((filter, index2) => (
                    <MenuItem
                      key={index2}
                      sx={{ color: theme.palette.sky_blue.main }}
                      onClick={() => handleFilterSelect(filter, filterName)}
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
                  {option?.values?.map((item, index2) => {
                    let value = typeof item === "string" ? item : item.value;

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
  sx: PropTypes.object,
};

export default FilterContainer;
