import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styles from "./SignIn.module.css";
import { theme } from "../../theme";
import image from "/signup.jpg";

import { useAuth } from "../../hooks/useAuth";
import CustomAlert from "../../components/Other/CustomAlert";

function SignIn() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);

  const [errorAlert, setErrorAlert] = useState({
    open: false,
    severity: "error",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (errorAlert.open) {
      setTimeout(() => {
        setErrorAlert({
          open: false,
          severity: "error",
          message: "",
        });
      }, 3000);
    }
  });

  const handleChange = (e) => {
    setIsInvalid(false);

    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(data.email, data.password, "patient");

      navigate("/");
      // setIsInvalid(response.data.response === 1 ? false : true);
    } catch (error) {
      console.log(error);
      setErrorAlert({
        open: true,
        message: error.response.data.message,
      });
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
        <Typography color="primary" variant="h5" sx={{ my: "20px" }}>
          Sign In
        </Typography>
        {isInvalid && (
          <Alert severity="error" sx={{ mb: "20px" }}>
            Invalid email or password. Try again
          </Alert>
        )}
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <Stack
            direction={"column"}
            spacing={3}
            sx={{ width: "100%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
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

            <Typography
              sx={{
                fontSize: "80%",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { color: theme.palette.green.main },
              }}
            >
              Forgot my password
            </Typography>

            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Do not have an account?{" "}
              <Link to={"/signup"} style={{ color: "blue" }}>
                Sign Up
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
      <CustomAlert
        message={errorAlert.message}
        severity="error"
        open={errorAlert.open}
      />
    </Box>
  );
}

export default SignIn;
