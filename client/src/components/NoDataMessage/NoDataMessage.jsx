import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";

function NoDataMessage({ message }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minWidth: "fit-content",
        minHeight: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h6">No {message} to show</Typography>
    </Box>
  );
}

NoDataMessage.propTypes = {
  message: PropTypes.string,
};

export default NoDataMessage;
