import { Box, CircularProgress } from "@mui/material";

function CustomProgress() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        height: "100%",
        minHeight: "200px",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default CustomProgress;
