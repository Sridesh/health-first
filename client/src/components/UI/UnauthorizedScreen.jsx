import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UnauthorizedScreen() {
  const { user } = useAuth();
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
      <Typography>You Do not Have Access To This Page</Typography>
      <Button onClick={() => navigate(user.role === "admin" ? "/admin" : "/")}>
        Go to home page
      </Button>
    </Box>
  );
}

export default UnauthorizedScreen;
