import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "./AllServices.module.css";

import { Box, Stack, Typography, useMediaQuery } from "@mui/material";

import Header from "../../components/Header/Header";
import { theme } from "../../theme";

const options = [
  {
    img_url: "https://img.icons8.com/3d-fluency/94/doctors-bag.png",
    title: "Medical Products",
    link: "medical-products",
    color: "rgba(0,130,162, 0.7)",
  },
  {
    img_url:
      "https://img.icons8.com/3d-fluency/94/syringe-with-a-drop-of-blood.png",
    title: "Laboratory",
    link: "lab-services",
    color: "rgba(0,142,178, 0.7)",
  },
  {
    img_url: "https://img.icons8.com/3d-fluency/94/tonometer.png",
    title: "Scans",
    link: "scans",
    color: "rgba(0,98,122 , 0.7)",
  },
  {
    img_url: "https://img.icons8.com/3d-fluency/94/nurse-female--v2.png",
    title: "Health Checkups",
    link: "health0-checkups",
    color: "rgba(1,137,171, 0.7)",
  },
];

function AllServices() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const Tile = ({ data }) => (
    <Box
      className={styles["tile"]}
      sx={{
        bgcolor: data.color,
        width: "150px",
        height: "150px",
        backdropFilter: "blur(3px)",
        ":hover": {
          width: "165px",
          height: "165px",
        },
        transition: "width 200ms ease-in, height 200ms ease-in",
      }}
      onClick={() => handleClick(data.link)}
    >
      <Box
        sx={{
          backgroundImage: `url(${data.img_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50px",
          width: "50px",
        }}
      />
      <Typography sx={{ color: "white", fontWeight: 500 }}>
        {data.title}
      </Typography>
    </Box>
  );

  Tile.propTypes = {
    data: PropTypes.object,
  };

  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Our Services"}
        description={
          "Access all your healthcare needs in one place. From accurate lab tests and advanced scans to a fully stocked pharmacy—we’re here to provide you with seamless, high-quality service for your wellness journey."
        }
      />
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={"center"}
        sx={{ height: "300px", position: "relative", width: "70%", mt: "20px" }}
      >
        <Typography
          variant="h4"
          sx={{ color: theme.palette.teal.main, width: "50%" }}
        >
          Select a service
        </Typography>
        {!isMobile && (
          <Box
            sx={{
              width: "150%",
              height: "2px",
              bgcolor: "teal",
              zIndex: -1,
              borderRadius: "50px",
            }}
          />
        )}
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems={"center"}
          sx={{
            position: isMobile ? "static" : "absolute",
            left: "30%",
            height: isMobile ? "fit-content" : "170px",
          }}
        >
          {options.map((item, index) => (
            <Tile key={index} data={item} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default AllServices;
