import { useEffect, useState } from "react";

import styles from "./Doctors.module.css";
import { theme } from "../../theme";

import axios from "axios";
import {
  Box,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import GridView from "../../components/GridView/GridView";

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
      <Box
        className={styles["header"]}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h4" className={styles["header_heading"]}>
          Our Doctors
        </Typography>
        <TextField
          type="text"
          placeholder="Search for doctors"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            my: "15px",
            background: "rgba(9, 93, 126, 0.6)",
            borderRadius: "50px",
            color: "white",
            "& .MuiInputBase-input": {
              color: "white",
              fontWeight: "100 !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "50px",
              border: "none",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        />
        <Box sx={{ width: { xs: "100%", sm: "40%" } }}>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "right" },
              color: theme.palette.yellow.main,
            }}
          >
            Discover our team of compassionate and skilled doctors, ready to
            provide the highest standard of care. Browse specialties, view
            profiles, and find the perfect match for your healthcare needs. From
            expert consultations to personalized treatment, our doctors are here
            to support you on your wellness journey.
          </Typography>
        </Box>
      </Box>
      <Box className={styles["container_grid-container"]}>
        <GridView data={pageData} />
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
