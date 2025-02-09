import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./LabServices.module.css";
import { theme } from "../../theme";

import { Box, Divider, Stack, Typography } from "@mui/material";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";

import Header from "../../components/Header/Header";
import ServiceList from "../../components/ServiceList/ServiceList";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import api from "../../api/api";

const Option = ({ icon, text }) => (
  <Box
    display={"flex"}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    sx={{
      color: theme.palette.teal.main,
      ":hover": {
        color: theme.palette.sky_blue.main,
      },
      transition: "color 300ms ease-in-out",
      m: "20px",
      fontSize: "10px",
      cursor: "pointer",
    }}
  >
    {icon}
    <Typography sx={{ textAlign: "center" }}>{text}</Typography>
  </Box>
);

function LabServices() {
  const [data, setData] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState(null);
  const [selectedSort, setSelectedSort] = useState({
    order: "first_name",
    sort: "asc",
  });

  const [filterList, setFilterList] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = `/test/get-medi-tests?filter=${selectedFilters}&order=${selectedSort.order}&sort=${selectedSort.sort}`;
        const response = await api.get(url);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [selectedFilters, selectedSort]);

  useEffect(() => {
    const tempList = [...new Set(data.map((test) => test.type))];

    if (tempList.length >= filterList) setFilterList(tempList);
  }, [data, filterList]);

  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Our Laboratory Services"}
        description={
          "Access a full range of diagnostic lab services, designed to provide fast and accurate results. From routine tests to specialized screenings, our state-of-the-art labs are equipped to meet your health needs. Easily schedule tests, view results, and trust in our commitment to precision and care at every step of your health journey"
        }
        onChange={setSearchString}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ marginY: "20px", width: { xs: "100%", sm: "70%" } }}
      >
        <Option
          text={"Call Customer Care"}
          icon={<SupportAgentRoundedIcon sx={{ fontSize: "70px" }} />}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Option
          text={"Find Nearest Lab"}
          icon={<LocationOnOutlinedIcon sx={{ fontSize: "70px" }} />}
        />
        <Divider orientation="vertical" variant="middle" flexItem />

        <Option
          text={"Reviews"}
          icon={<GradingOutlinedIcon sx={{ fontSize: "70px" }} />}
        />
      </Stack>
      <FilterContainer
        isSingleFilter={true}
        filters={selectedFilters}
        setFilter={setSelectedFilters}
        filterNames={["Category"]}
        filterValues={[filterList]}
        getSort={setSelectedSort}
        sortOptions={[
          {
            option: "Test Name",
            values: ["Ascending", "Descending"],
            columnName: "test_name",
          },
        ]}
      />
      <ServiceList
        data={
          searchString === ""
            ? data
            : data.filter((item) =>
                item.test_name
                  .toLowerCase()
                  .includes(searchString.toLowerCase())
              )
        }
      />
    </Box>
  );
}

Option.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.node,
  link: PropTypes.string,
};

export default LabServices;
