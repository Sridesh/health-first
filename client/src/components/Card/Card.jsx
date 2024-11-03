import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

import image from "../../../public/2.png";
import { theme } from "../../theme";
import { useState } from "react";

function Card() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "5px",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        width: "180px",
        height: "220px",
        overflow: "hidden",
      }}
      //   boxShadow={1}
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
        }}
      />
      <Box sx={{ flexGrow: 1, padding: "15px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "90%",
            color: theme.palette.black.main,
          }}
        >
          Prof. Nadeena Jayasuriya
        </Typography>
        <Typography sx={{ color: theme.palette.teal.main, fontSize: "80%" }}>
          Oral Surgon
        </Typography>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  //   shadow: PropTypes.string,
};
export default Card;
