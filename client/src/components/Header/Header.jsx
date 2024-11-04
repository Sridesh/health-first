import { useState } from "react";
import PropTypes from "prop-types";

import { theme } from "../../theme";
import styles from "./Header.module.css";

import {
  Box,
  Button,
  Collapse,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

function Header({ heading, onChange, description }) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    onChange(event);
  };
  return (
    <Box
      className={styles["header"]}
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <Typography variant="h4" className={styles["header_heading"]}>
        {heading}
      </Typography>
      <TextField
        type="text"
        placeholder={"Search " + heading.split(" ")[1].toLowerCase()}
        onChange={handleChange}
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
        {isMobile && (
          <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
            <Button sx={{ color: "white" }} onClick={() => setOpen(!open)}>
              <Typography sx={{ fontSize: "70%" }}>
                {open ? "Hide decription" : "Show description"}
              </Typography>
              {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            </Button>
          </Stack>
        )}
        <Collapse in={!isMobile || open}>
          <Typography
            sx={{
              textAlign: { xs: "center", sm: "right" },
              color: theme.palette.yellow.main,
            }}
          >
            {description}
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  heading: PropTypes.string,
  onChange: PropTypes.func,
  description: PropTypes.string,
};

export default Header;
