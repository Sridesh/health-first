import { Box, Skeleton, Stack } from "@mui/material";

function CardLoader() {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "10px",
        width: "180px",
        height: "250px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <Stack
        direction={"column"}
        spacing={1}
        sx={{ flexGrow: 1, padding: "15px", overflow: "hidden" }}
      >
        <Skeleton animation="wave" height={10} width="80%" />
        <Skeleton animation="wave" height={10} width="40%" />
        <Skeleton animation="wave" height={10} width="60%" />
      </Stack>
    </Box>
  );
}

export default CardLoader;
