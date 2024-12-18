import { useState } from "react";
import { Link } from "react-router-dom";
import { regexStrings } from "../../data";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

import styles from "./SignUp.module.css";
import { theme } from "../../theme";
import image from "/signup.jpg";

function SignUp() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { onlyLetters, onlyNumbers, emailFormat } = regexStrings;

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "Male",
    nic: "",
    password: "",
  });

  const [regexErrors, setRegexErrors] = useState([]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "first_name" || e.target.name === "last_name") {
      if (onlyLetters.test(e.target.value)) {
        setRegexErrors((prev) => prev.filter((item) => item !== e.target.name));
        setData((prev) => {
          return {
            ...prev,
            [e.target.name]: e.target.value,
          };
        });
      } else {
        setRegexErrors((prev) => [...prev, e.target.name]);
      }
    }
    else if
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth-patient/register",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={styles["container"]}>
      {!isMobile && (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "red",
            height: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <Box className={styles["form-container"]}>
        <Typography color="primary" variant="h5" sx={{ mb: "20px" }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <Stack
            direction={"column"}
            spacing={3}
            sx={{ width: "100%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              label="First Name"
              type="text"
              sx={{ width: "80%" }}
              name="first_name"
              size="small"
              value={data.first_name}
              onChange={handleChange}
              required
              helperText={
                regexErrors.includes("first_name") ? "Only enter letters" : ""
              }
              error={regexErrors.includes("first_name")}
            />
            <TextField
              label="Last Name"
              type="text"
              sx={{ width: "80%" }}
              name="last_name"
              size="small"
              value={data.last_name}
              onChange={handleChange}
              required
              helperText={
                regexErrors.includes("last_name") ? "Only enter letters" : ""
              }
              error={regexErrors.includes("last_name")}
            />
            <TextField
              label="Email"
              type="text"
              sx={{ width: "80%" }}
              name="email"
              size="small"
              value={data.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              type="text"
              sx={{ width: "80%" }}
              name="phone_number"
              size="small"
              value={data.phone_number}
              onChange={handleChange}
              required
            />
            <TextField
              label="NIC"
              type="text"
              sx={{ width: "80%" }}
              name="nic"
              size="small"
              value={data.nic}
              onChange={handleChange}
              required
            />

            <FormControl sx={{ width: "50%" }}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{ width: "100%" }}
              >
                <Stack
                  direction={"row"}
                  sx={{ width: "100%" }}
                  justifyContent={"space-around"}
                >
                  <FormControlLabel
                    value="Male"
                    name="gender"
                    control={<Radio />}
                    label="Male"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="Female"
                    name="gender"
                    control={<Radio />}
                    label="Female"
                    onChange={handleChange}
                  />
                </Stack>
              </RadioGroup>
            </FormControl>

            <TextField
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              sx={{ width: "80%" }}
              name="password"
              size="small"
              value={data.password}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                      >
                        {isPasswordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              sx={{ width: "80%" }}
            >
              Signin
            </Button>

            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Already have an account?{" "}
              <Link to={"/signin"} style={{ color: "blue" }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
