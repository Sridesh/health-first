import { Alert, Snackbar } from "@mui/material";

function CustomAlert({ open, message, severity }) {
  return (
    <Snackbar open={open}>
      <Alert></Alert>
    </Snackbar>
  );
}

export default CustomAlert;
