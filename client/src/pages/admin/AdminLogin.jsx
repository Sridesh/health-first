import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./Admin.module.css";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/Other/CustomAlert";
import { regexStrings } from "../../data";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AdminLogin() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [adminKey, setAdminKey] = useState("");

  const [isAdminVerified, setIsAdminVerified] = useState(null);

  const [errorAlert, setErrorAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    if (errorAlert.open) {
      setTimeout(() => {
        setErrorAlert({
          open: false,
          message: "",
          severity: "",
        });
      }, 3000);
    }
  }, [errorAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (regexStrings.emailFormat.test(value)) {
        setFromData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
    } else {
      setFromData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await login(formData.email, formData.password, "admin");
      console.log("res", response);
      navigate("/admin/");
    } catch (error) {
      setErrorAlert({
        open: true,
        message: error.response?.data?.message || "Sever Error",
        severity: "error",
      });
    }
  };

  const handleKeyCheck = () => {
    if (adminKey === import.meta.env.VITE_ADMIN_KEY) {
      setIsAdminVerified(true);
    } else {
      setIsAdminVerified(false);
    }
  };

  return (
    <Box className={styles["login-container"]}>
      {!isAdminVerified ? (
        <Dialog open={true}>
          <DialogTitle>
            <Typography>Enter Admin Key</Typography>
          </DialogTitle>
          <DialogContent>
            <Stack direction={"column"} spacing={1}>
              <TextField
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                size="small"
              />
              {isAdminVerified === false && (
                <Alert severity="warning">Incorrect Key. Try Again.</Alert>
              )}
              <Button onClick={handleKeyCheck}>Submit</Button>
            </Stack>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <Typography variant="h5" sx={{ mb: "50px" }}>
            Admin Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "20px",
              width: "300px",
              height: "fit-content",
              border: "1px solid #ccecee",
            }}
          >
            <Stack direction={"column"} spacing={2}>
              <TextField
                sx={{ flex: 1 }}
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
                label="Email"
              />
              <TextField
                sx={{ flex: 1 }}
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                size="small"
                label="Password"
              />
            </Stack>

            <Button type="submit">Login</Button>
          </form>
        </>
      )}

      <CustomAlert
        message={errorAlert.message}
        severity={errorAlert.severity}
        open={errorAlert.open}
      />
    </Box>
  );
}

export default AdminLogin;
