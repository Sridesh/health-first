import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function InvalidEnrty() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        flex: 1,
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography>Oops. Looks like you tried an invalid entry</Typography>
      <Button onClick={() => navigate("/")}>Go to home page</Button>
    </Box>
  );
}

export default InvalidEnrty;
