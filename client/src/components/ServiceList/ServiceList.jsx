import styles from "./ServiceList.module.css";
import { theme } from "../../theme";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";

function ServiceList() {
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
      </Box>
    </Box>
  );
}

export default ServiceList;
