import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";

function AdCarousel() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel
      //   fullHeightHover={true}
      sx={{
        ml: "80px",
        mt: "20px",
        width: { xs: "200px", sm: "500px", md: "600px" },
        height: { xs: "200px", sm: "350px", md: "450px" },
      }}
    >
      {items.map((item) => (
        <Box
          key={item.name}
          sx={{
            width: { xs: "200px", sm: "500px", md: "600px" },
            height: { xs: "150px", sm: "300px", md: "400px" },
            bgcolor: "coral",
          }}
        >
          {item.name}
        </Box>
      ))}
    </Carousel>
  );
}

export default AdCarousel;
