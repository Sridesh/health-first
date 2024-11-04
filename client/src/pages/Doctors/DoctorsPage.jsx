import { useEffect, useState } from "react";

import styles from "./Doctors.module.css";

import axios from "axios";
import { Box, Pagination } from "@mui/material";

import GridView from "../../components/GridView/GridView";
import GridLoader from "../../components/GridView/GridLoader";
import Header from "../../components/Header/Header";

function DoctorsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/doctors");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    setPageData(data.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE));
  }, [data, page]);

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
      />
      <Box className={styles["container_grid-container"]}>
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
