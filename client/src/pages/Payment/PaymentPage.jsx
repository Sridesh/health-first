import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Divider, Stack, Typography } from "@mui/material";

import styles from "./Payment.module.css";

import { usePaymentAccess } from "../../hooks/usePaymentAccess";
import { theme } from "../../theme";

function PaymentPage() {
  const { revokePaymentAccess } = usePaymentAccess();

  const location = useLocation();

  const { item, quantity } = location.state;

  const [address, setAddress] = useState({
    address: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    return () => {
      revokePaymentAccess();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (location.pathname !== "/purchases-payment") {
        revokePaymentAccess();
      }
    };
  }, [location]);

  return (
    <Box className={styles.container}>
      {/* // order summary */}
      <>
        <Stack sx={{ width: "80%" }} direction={"row"}>
          <Typography variant="h5" sx={{ ml: "60px", flex: 3 }}>
            Order Summary
          </Typography>
          <Typography sx={{ ml: "60px", flex: 1 }}>Unit Price</Typography>
          <Typography sx={{ ml: "60px", flex: 1 }}>Quantity</Typography>
          <Typography sx={{ ml: "60px", flex: 1 }}>Total</Typography>
        </Stack>

        <Divider sx={{ width: "80%" }} />

        <Stack
          sx={{ width: "80%", alignItems: "center", mt: "10px" }}
          direction={"row"}
        >
          <Stack
            direction={"row"}
            variant="h5"
            sx={{ ml: "60px", flex: 3, alignItems: "center" }}
          >
            <Box
              component="img"
              src={item.imageUrl}
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography sx={{ color: theme.palette.light_gray.main }}>
              {item.item_name}
            </Typography>
          </Stack>
          <Typography
            sx={{ ml: "60px", flex: 1, color: theme.palette.light_gray.main }}
          >
            LKR {item.price}
          </Typography>
          <Typography
            sx={{ ml: "60px", flex: 1, color: theme.palette.light_gray.main }}
          >
            {quantity}
          </Typography>
          <Typography sx={{ ml: "60px", flex: 1, fontWeight: "bold" }}>
            LKR {(item.price * quantity).toFixed(2)}
          </Typography>
        </Stack>
        {/* <Divider sx={{ width: "80%" }} /> */}
      </>

      {/* Deliver Details */}
      <Stack sx={{ width: "80%", mt: "30px" }} direction={"row"}>
        <Typography variant="h5" sx={{ ml: "60px", flex: 3 }}>
          Delivery Details
        </Typography>
      </Stack>
      <Divider sx={{ width: "80%" }} />

      <Box className={styles["payment"]}></Box>
    </Box>
  );
}

export default PaymentPage;
