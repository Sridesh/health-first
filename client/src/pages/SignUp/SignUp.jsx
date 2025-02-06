import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

import checkPassowrdStrength from "../../helpers/checkPasswordStrength";
import { regexStrings } from "../../data";
import { ValidateNICNumber } from "../../helpers/validateNICNumber";
import CustomAlert from "../../components/Other/CustomAlert";
import VerificationWindow from "../../components/VerificationWindow/VerificationWindow";
import CustomBuffer from "../../components/UI/CustomBuffer";

function SignUp() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { onlyLetters, onlyNumbers, emailFormat } = regexStrings;

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: null,
    nic: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [regexErrors, setRegexErrors] = useState([]);
  const [error, setError] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  }, [error]);

  const handleChange = (e) => {
    //first name & last name validation
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

    //phone number validation
    else if (e.target.name === "phone_number") {
      if (onlyNumbers.test(e.target.value)) {
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

    //password strength validation
    else if (e.target.name === "password") {
      setPasswordStrength(checkPassowrdStrength(e.target.value));
      setData((prev) => {
        return {
          ...prev,
          password: e.target.value,
        };
      });
    }

    //Gender
    else if (e.target.name === "gender") {
      setData((prev) => {
        return {
          ...prev,
          gender: e.target.value.toLowerCase(),
        };
      });
    }

    //confirm password
    else if (e.target.name === "confirm_password") {
      setConfirmPassword(e.target.value);
    } else {
      setData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const validateData = () => {
    if (!emailFormat.test(data.email)) {
      setError("Invalid Email Format");
      return false;
    } else if (data.phone_number.length < 10) {
      setError("Phone number format incorrect");
      return false;
    } else if (!ValidateNICNumber(data.nic)) {
      setError("Invalid ID Format");
      return false;
    } else if (!data.gender) {
      setError("Please select a gender");
      return false;
    } else if (data.password !== confirmPassword) {
      setError("Confirm password do not match");
      return false;
    } else if (passwordStrength.strength < 4) {
      setError("Your password is too weak");
      return false;
    } else return true;
  };

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();

    if (validateData()) {
      setIsBuffering(true);
      try {
        const response = await axios.post(
          "http://localhost:3001/verification/set-otp",
          { email: data.email }
        );
        setIsVerifying(true);
        console.log(response);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message);
      } finally {
        setIsBuffering(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth-patient/register",
        {
          data,
        }
      );
      console.log(response);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
        <form onSubmit={handleSubmitButtonClick} style={{ width: "80%" }}>
          <Stack
            direction={"column"}
            spacing={2}
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
              helperText={
                regexErrors.includes("phone_number") ? "Only enter numbers" : ""
              }
              error={regexErrors.includes("phone_number")}
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

            <Stack direction={"row"} spacing={2} sx={{ width: "80%" }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  sx={{ width: "100%" }}
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
                            onClick={() =>
                              setIsPasswordVisible((prev) => !prev)
                            }
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
                <Stack
                  direction={"row"}
                  spacing={0.5}
                  sx={{ flex: 1, mt: "10px" }}
                >
                  {[1, 2, 3, 4].map((item) => (
                    <Box
                      key={item}
                      sx={{
                        height: "4px",
                        flex: 1,
                        borderRadius: "50px",
                        bgcolor:
                          item <= passwordStrength?.strength && passwordStrength
                            ? passwordStrength.color
                            : "#999",
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <TextField
                label="Confirm Password"
                type={"password"}
                sx={{ flex: 1 }}
                name="confirm_password"
                size="small"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </Stack>

            <Button
              color="primary"
              type="submit"
              variant="contained"
              sx={{ width: "80%", mt: "30px" }}
            >
              Signup
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

      <CustomAlert message={error} open={error !== null} severity={"error"} />

      <VerificationWindow
        open={isVerifying}
        onCancel={() => {
          setIsVerifying(false);
        }}
        onSuccess={handleSubmit}
        email={data.email}
      />

      {isBuffering && <CustomBuffer />}
    </Box>
  );
}

export default SignUp;
