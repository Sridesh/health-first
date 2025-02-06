import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

function CustomBuffer() {
  return (
    <Backdrop open={true}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <CircularProgress sx={{ color: "white" }} />
        <Typography sx={{ color: "white" }}>One moment please</Typography>
      </Stack>
    </Backdrop>
  );
}

export default CustomBuffer;
