import styles from "./Doctors.module.css";
import { theme } from "../../theme";

import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Card from "../../components/Card/Card";

function DoctorsPage() {
  return (
    <Box className={styles["container"]}>
      <Box className={styles["header"]}>
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
        <Box sx={{ width: "40%" }}>
          <Typography
            sx={{
              textAlign: "right",
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
      <Card />
      <Card />
    </Box>
  );
}

export default DoctorsPage;
