import { useEffect, useState } from "react";

import styles from "./ServiceList.module.css";
import { theme } from "../../theme";

import axios from "axios";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

function ServiceList() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/labs");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  const Element = () => (
    <Box className={styles["element"]} sx={{ width: { xs: "80%", sm: "70%" } }}>
      <Box>
        <Typography sx={{ color: theme.palette.black.main, fontWeight: 500 }}>
          Bone Density Scan
        </Typography>
        <Typography sx={{ fontSize: "90%", color: theme.palette.teal.main }}>
          Radiology
        </Typography>
      </Box>
      {!isMobile && (
        <Stack direction={"row"} spacing={1}>
          <Typography sx={{ fontSize: "75%", color: theme.palette.gray.main }}>
            Read About This Service
          </Typography>
        </Stack>
      )}
      <Button
        sx={{ fontSize: "75%", maxWidth: "40%" }}
        size="small"
        color="success"
        variant="outlined"
      >
        Book Appointment
      </Button>
    </Box>
  );

  return (
    <Box className={styles["container"]}>
      <Box className={styles["container_list"]}>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.green.main, my: "20px" }}
        >
          Select a service
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "50%" }}
        >
          <Button>
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

          <Button>
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
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <>
            <Element />
            <Divider sx={{ width: "60%" }} />
          </>
        ))}
      </Box>
    </Box>
  );
}

export default ServiceList;
