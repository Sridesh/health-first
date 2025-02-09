import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Backdrop,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import styles from "./Verification.module.css";
import { theme } from "../../theme";

import CustomAlert from "../Other/CustomAlert";
import CustomProgress from "../CustomProgress/CustomProgress";
import Timer from "../Other/Timer";
import api from "../../api/api";

function VerificationWindow({ open, email, onSuccess, onCancel }) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [alertOptions, setAlertOptions] = useState({
    open: false,
    message: null,
    severity: null,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => {
      if (alertOptions.open) {
        setAlertOptions({
          open: false,
          message: "",
          severity: "",
        });
      }
    }, 3000);
  }, [alertOptions]);

  const handleCancel = () => {
    onCancel();
    setOtp("");
  };

  const handleVerified = () => {
    onSuccess();
  };

  // const handleResendCode = () => {};

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("verification/verify-otp", {
        email,
        otp,
      });

      setAlertOptions({
        open: true,
        message: response.data.message,
        severity: "success",
      });

      handleVerified();
    } catch (error) {
      console.log(error);

      setAlertOptions({
        open: true,
        message: error.response.data.error || "Error Occurred",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Backdrop open={open} sx={{ zIndex: 2 }}>
      <Box
        className={styles.container}
        sx={{ width: isMobile ? "250px" : "400px" }}
      >
        <Typography variant="h5" color="error" sx={{ mb: "30px" }}>
          Verification
        </Typography>
        <Typography sx={{ mb: "20px", textAlign: "center" }}>
          An OTP code has been sent to your mail <b> {email} </b>. Please enter
          it to complete your sign up.
        </Typography>

        <Timer seconds={90} />

        {isLoading ? (
          <CustomProgress />
        ) : (
          <TextField
            value={otp}
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            sx={{ width: "80%" }}
          />
        )}
        <Button
          sx={{ ml: "auto", mr: "35px", mb: "20px", mt: "10px" }}
          disabled={isLoading}
        >
          Resend Code
        </Button>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          spacing={2}
          sx={{ width: "80%" }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{ flex: 1 }}
            disabled={otp.length === 0 || isLoading}
            onClick={handleVerification}
          >
            Verify
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="error"
            fullWidth
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>

      <CustomAlert
        open={alertOptions.open}
        message={alertOptions.message}
        severity={alertOptions.severity}
      />
    </Backdrop>
  );
}

VerificationWindow.propTypes = {
  open: PropTypes.bool,
  email: PropTypes.string,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default VerificationWindow;
