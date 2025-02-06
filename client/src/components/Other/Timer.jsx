import PropTypes from "prop-types";

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Timer({ seconds }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    const timerInterval = () => {
      setInterval(() => {
        if (time >= 0) {
          setTime((time) => time - 1);
        }
      }, 1000);
    };

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <Box sx={{ padding: "15px" }}>
      <Typography sx={{}}>Time remaining: {time}</Typography>
    </Box>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
};

export default Timer;
