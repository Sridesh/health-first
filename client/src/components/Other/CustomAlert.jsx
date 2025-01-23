import PropTypes from "prop-types";

import { Alert, Snackbar } from "@mui/material";

function CustomAlert({ open, message, severity }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

CustomAlert.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.string,
};

export default CustomAlert;
