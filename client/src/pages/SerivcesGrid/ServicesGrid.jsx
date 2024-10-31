import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import tinycolor from "tinycolor2";

import styles from "./ServicesGrid.module.css";
import { theme } from "../../theme";

const ServiceCard = () => (
  <Box
    sx={{
      padding: "10px",
      flexGrow: 1,
      bgcolor: "white",
      height: "160px",
      borderRadius: "5px",
      boxShadow:
        "2px 2px 4px" +
        tinycolor(theme.palette.bg_blue.main).darken().toString(),
    }}
  >
    <Typography variant="h6" sx={{ color: theme.palette.green.main }}>
      Channeling
    </Typography>
    <Stack
      sx={{ width: "100%" }}
      direction={"row"}
      alignItems={"center"}
      spacing={2}
    >
      <Typography sx={{ width: "60%", fontSize: "80%", color: "gray" }}>
        Conveniently schedule appointments with trusted healthcare providers to
        get timely care and support
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.yellow.main,
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <MedicalInformationOutlinedIcon
          sx={{ fontSize: "300%", color: theme.palette.green.main }}
        />
      </Box>
    </Stack>
    <Stack sx={{ width: "100%", justifyContent: "flex-end" }}>
      <Button>Visit</Button>
    </Stack>
  </Box>
);

function ServicesGrid() {
  return (
    <Box className={styles["container"]}>
      <Typography variant="h4" sx={{ color: theme.palette.teal.main }}>
        Select a service
      </Typography>
      <Grid2
        container
        sx={{ width: { xs: "80%", md: "50%" }, margin: "10px" }}
        spacing={2}
      >
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <ServiceCard />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <ServiceCard />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <ServiceCard />
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <ServiceCard />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default ServicesGrid;
