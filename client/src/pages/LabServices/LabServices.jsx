import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./LabServices.module.css";
import { theme } from "../../theme";

import axios from "axios";
import { Box, Divider, Stack, Typography } from "@mui/material";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";

import Header from "../../components/Header/Header";
import ServiceList from "../../components/ServiceList/ServiceList";

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

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/test/get-medi-tests`
        );
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Our Laboratory Services"}
        description={
          "Access a full range of diagnostic lab services, designed to provide fast and accurate results. From routine tests to specialized screenings, our state-of-the-art labs are equipped to meet your health needs. Easily schedule tests, view results, and trust in our commitment to precision and care at every step of your health journey"
        }
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
      <ServiceList data={data} />
    </Box>
  );
}

Option.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.node,
  link: PropTypes.string,
};

export default LabServices;
