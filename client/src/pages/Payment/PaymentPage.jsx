import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Autocomplete,
  Box,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";

import styles from "./Payment.module.css";

import { usePaymentAccess } from "../../hooks/usePaymentAccess";
import { theme } from "../../theme";
import { districts } from "../../data";

function PaymentPage() {
  const { revokePaymentAccess } = usePaymentAccess();

  const location = useLocation();

  const { item, quantity } = location.state;

  const deliveryFee = import.meta.env.VITE_DELIVERY_CHARGES;

  const [address, setAddress] = useState({
    address: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [formData, setFormData] = useState({
    cardNumber: "",
    holderName: "",
    expMonth: "",
    expYear: "",
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

  const handleAddressChange = () => {};

  const handleCardChanges = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

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
          <Typography sx={{ ml: "60px", flex: 1 }}>Delivery Charges</Typography>
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
          <Typography
            sx={{ ml: "60px", flex: 1, color: theme.palette.light_gray.main }}
          >
            LKR {deliveryFee}
          </Typography>
          <Typography sx={{ ml: "60px", flex: 1, fontWeight: "bold" }}>
            LKR {(item.price * quantity + parseFloat(deliveryFee)).toFixed(2)}
          </Typography>
        </Stack>
        {/* <Divider sx={{ width: "80%" }} /> */}
      </>

      {/* Deliver Details */}
      <>
        <Stack sx={{ width: "80%", mt: "70px" }} direction={"row"}>
          <Typography variant="h5" sx={{ ml: "60px", flex: 3 }}>
            Delivery Details
          </Typography>
        </Stack>

        <Divider sx={{ width: "80%" }} />

        {/* <form> */}
        <Grid2 container sx={{ flex: 1, mt: "20px", width: "80%" }} gap={2}>
          <Grid2 item size={{ sx: 12, sm: 6 }} sx={{ flex: 1 }}>
            <TextField
              required
              size="small"
              sx={{ flex: 1, width: "100%" }}
              type="text"
              label="Address"
              value={address.address}
              onChange={handleAddressChange}
            />
          </Grid2>
          <Grid2 item size={{ sx: 12, sm: 4 }} sx={{ flex: 1 }}>
            <TextField
              required
              size="small"
              sx={{ flex: 1, width: "100%" }}
              type="text"
              label="City"
              value={address.city}
              onChange={handleAddressChange}
            />
          </Grid2>
          <Grid2 item size={{ sx: 12, sm: 5 }} sx={{ flex: 1 }}>
            <Autocomplete
              size="small"
              isOptionEqualToValue={(value, option) => value === option}
              value={address.district}
              onChange={handleAddressChange}
              id="controllable-states-demo"
              options={districts}
              renderInput={(params) => (
                <TextField required {...params} label="District" />
              )}
              sx={{ flex: 1, width: "100%" }}
            />
          </Grid2>
          <Grid2 item size={{ sx: 12, sm: 5 }} sx={{ flex: 1 }}>
            <TextField
              required
              size="small"
              sx={{ flex: 1, width: "100%" }}
              type="text"
              label="Zip Code"
              value={address.zipCode}
              onChange={handleAddressChange}
            />
          </Grid2>
        </Grid2>
      </>

      {/* Payment Details */}
      <Stack sx={{ width: "80%", mt: "70px" }} direction={"row"}>
        <Typography variant="h5" sx={{ ml: "60px", flex: 3 }}>
          Billing
        </Typography>
      </Stack>
      <Divider sx={{ width: "80%" }} />
      <Grid2 container sx={{ flex: 1, mt: "20px", width: "80%" }} gap={2}>
        <Grid2 item size={{ sx: 12, sm: 5 }} sx={{ flex: 1 }}>
          <TextField
            required
            size="small"
            sx={{ flex: 1, width: "100%" }}
            type="text"
            label="Card Holder Name"
            name="holderName"
            value={formData.holderName}
            onChange={handleCardChanges}
          />
        </Grid2>
        <Grid2 item size={{ sx: 12, sm: 5 }} sx={{ flex: 1 }}>
          <TextField
            required
            size="small"
            sx={{ flex: 1, width: "100%" }}
            type="text"
            label="Card Number"
            name="cardNumber"
            value={address.cardNumber}
            onChange={handleCardChanges}
          />
        </Grid2>
        <Grid2 item size={{ sx: 12, sm: 3 }} sx={{ flex: 1 }}>
          <TextField
            required
            size="small"
            sx={{ flex: 1, width: "100%" }}
            type="text"
            label="Exp Month"
            placeholder="MM"
            name="expMonth"
            value={formData.expMonth}
            onChange={handleCardChanges}
          />
        </Grid2>
        <Typography sx={{ fontSize: "140%" }}>/</Typography>
        <Grid2 item size={{ sx: 5, sm: 3 }} sx={{ flex: 1 }}>
          <TextField
            required
            size="small"
            sx={{ flex: 1, width: "100%" }}
            type="text"
            label="Exp Year"
            name="expYEar"
            placeholder="YY"
            value={formData.expYear}
            onChange={handleCardChanges}
          />
        </Grid2>
        <Grid2 item size={{ sx: 5, sm: 4 }} sx={{ flex: 1 }}>
          <TextField
            required
            size="small"
            sx={{ flex: 1, width: "100%" }}
            type="text"
            label="Zip Code"
            value={formData.cvv}
            onChange={handleCardChanges}
          />
        </Grid2>
      </Grid2>

      <Box className={styles["payment"]}></Box>
    </Box>
  );
}

export default PaymentPage;
