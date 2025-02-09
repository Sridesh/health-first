import { useEffect, useState } from "react";

import styles from "./Doctors.module.css";

import { Box, Pagination } from "@mui/material";

import GridView from "../../components/GridView/GridView";
import GridLoader from "../../components/GridView/GridLoader";
import Header from "../../components/Header/Header";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import api from "../../api/api";

function DoctorsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState({
    order: "first_name",
    sort: "asc",
  });
  const [searchString, setSearchString] = useState("");

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    const fetch = async () => {
      const url = `/doctor/get-doctors?filter=${selectedFilter}&order=${selectedSort.order}&sort=${selectedSort.sort}`;

      try {
        const response = await api.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [selectedFilter, selectedSort]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/doctor/get-doctor-types");
        setFilters(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (searchString !== "") {
      const tempData = data.filter((item) =>
        item.first_name.toLowerCase().includes(searchString.toLowerCase())
      );

      setPageData(
        tempData.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)
      );
    } else {
      setPageData(
        data.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)
      );
    }
  }, [data, page, searchString]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Our Doctors"}
        description={
          "Discover our team of compassionate and skilled doctors, ready to provide the highest standard of care. Browse specialties, view profiles, and find the perfect match for your healthcare needs. From expert consultations to personalized treatment, our doctors are here to support you on your wellness journey."
        }
        onChange={setSearchString}
      />
      <Box className={styles["container_grid-container"]}>
        <FilterContainer
          isSingleFilter={true}
          filters={selectedFilter}
          setFilter={setSelectedFilter}
          filterNames={["Specialization"]}
          filterValues={[filters]}
          sortOptions={[
            {
              option: "Name",
              values: ["Ascending", "Descending"],
              columnName: "first_name",
            },
          ]}
          getSort={setSelectedSort}
          defaultSort={{
            option: "Name",
            values: ["Ascending", "Descending"],
            columnName: "first_name",
          }}
        />
        {isLoading ? <GridLoader /> : <GridView data={pageData} />}
        <Pagination
          page={page}
          count={Math.ceil(data?.length / CARDS_PER_PAGE)}
          onChange={handleChange}
          sx={{ marginTop: "30px" }}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}

export default DoctorsPage;
