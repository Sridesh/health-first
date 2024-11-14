import PropTypes from "prop-types";

import { Box, Button, Chip, Stack, Typography } from "@mui/material";

import image from "../../../public/2.png";
import { theme } from "../../theme";
// import { useState } from "react";

function Card({ data }) {
  //   const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "5px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        width: "180px",
        height: "250px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        ":hover": {
          boxShadow: `0 0px 10px rgba(76, 204, 255, 0.6)}`,
        },
      }}
      //   boxShadow={1}
      //   onMouseEnter={() => setIsHovered(true)}
      //   onMouseOut={() => setIsHovered(false)}
    >
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          //   bgcolor: "black",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Chip
          label={
            data.availability
              ? "Channelling available"
              : "Channelling unavailable"
          }
          color="success"
          sx={{
            margin: "5px",
            fontSize: "70%",
            background: data.availability
              ? "rgba(28, 207, 0, 0.8)"
              : "rgba(255, 0, 0, 0.8)",
          }}
          size="small"
        />
      </Box>
      <Stack
        direction={"column"}
        spacing={0.3}
        sx={{ flexGrow: 1, padding: "15px", overflow: "auto" }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "90%",
            color: theme.palette.gray.main,
          }}
        >
          {data.first_name + " " + data.last_name}
        </Typography>
        <Typography sx={{ color: theme.palette.teal.main, fontSize: "80%" }}>
          {data.category_name}
        </Typography>
        <Typography
          sx={{ color: theme.palette.light_gray.main, fontSize: "70%" }}
        >
          {data.description}
        </Typography>
      </Stack>
      <Button
        sx={{
          padding: "10px",
          position: "absolute",
          bottom: 1,
          right: 1,
          fontSize: "70%",
        }}
      >
        Channel now
      </Button>
    </Box>
  );
}

Card.propTypes = {
  data: PropTypes.object,
};
export default Card;
