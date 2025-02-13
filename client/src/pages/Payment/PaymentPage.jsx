import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid2,
  Stack,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";

import styles from "./Payment.module.css";
import { theme } from "../../theme";

import { usePaymentAccess } from "../../hooks/usePaymentAccess";
import { districts, regexStrings } from "../../data";
import { formatCardNumber, validateCard } from "../../helpers/formatCardNumber";
import { validateMonth, validateYear } from "../../helpers/validateExp";
import CustomAlert from "../../components/Other/CustomAlert";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/api";

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

  const [cardErrors, setCardErrors] = useState([]);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      revokePaymentAccess();
    };
  }, [revokePaymentAccess]);

  useEffect(() => {
    setTimeout(() => {
      if (isAlertOpen) {
        setIsAlertOpen(false);
      }
    }, 4000);
  }, [isAlertOpen]);

  useEffect(() => {
    return () => {
      if (location.pathname !== "/purchases-payment") {
        revokePaymentAccess();
      }
    };
  }, [location, revokePaymentAccess]);

  const handleAddressChange = (e, isSelect) => {
    if (isSelect && e) {
      setAddress((prev) => {
        return {
          ...prev,
          district: e,
        };
      });

      return;
    } else {
      const { name, value } = e.target;

      if (name === "zipCode") {
        if (regexStrings.onlyNumbers.test(value)) {
          setAddress((prev) => {
            return {
              ...prev,
              [name]: value.slice(0, 5),
            };
          });

          return;
        }
      } else {
        setAddress((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });

        return;
      }
    }
  };

  const handleCardChanges = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedNumber = formatCardNumber(value);

      setFormData((prev) => {
        return {
          ...prev,
          cardNumber: formattedNumber,
        };
      });
    } else if (name === "holderName") {
      if (/^[^\d]*$/.test(value)) {
        setFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
    } else if (name === "cvv") {
      if (regexStrings.onlyNumbers.test(value)) {
        setFormData((prev) => {
          return {
            ...prev,
            cvv: value.slice(0, 3),
          };
        });
      }
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value.slice(0, 2),
        };
      });
    }
    // setFormData((prev) => {
    //   return {
    //     ...prev,
    //     [name]: value,
    //   };
    // });
  };

  const validate = (type) => {
    if (type === "month") {
      setCardErrors((prev) => {
        return prev.filter((item) => item !== "month");
      });
      const date = validateMonth(formData.expMonth);

      if (date) {
        setFormData((prev) => {
          return {
            ...prev,
            expMonth: date,
          };
        });
      } else {
        setCardErrors((prev) => [...prev, "month"]);
      }
    } else {
      if (!validateYear(formData.expYear)) {
        setCardErrors((prev) => [...prev, "year"]);
      } else {
        setCardErrors((prev) => {
          return prev.filter((item) => item !== "year");
        });
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (cardErrors.length !== 0) {
      setIsAlertOpen(true);
      return;
    } else {
      try {
        await api.post("/orders/new-order", {
          userId: user.patient_uuid,
          total: item.price * quantity + 400,
        });
        setIsSaveSuccess(true);
        setTimeout(() => {
          navigate("/services/medical-products");
        }, [2000]);
      } catch (error) {
        console.log(error);
      }
    }
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

      <form
        onSubmit={handleFormSubmit}
        style={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                name="address"
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
                name="city"
                value={address.city}
                onChange={handleAddressChange}
              />
            </Grid2>
            <Grid2 item size={{ sx: 12, sm: 5 }} sx={{ flex: 1 }}>
              <Autocomplete
                size="small"
                isOptionEqualToValue={(value, option) => value === option}
                value={address.district}
                name="district"
                onChange={(e, value) => handleAddressChange(value, true)}
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
                name="zipCode"
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
        <>
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
                value={formData.cardNumber}
                onChange={handleCardChanges}
                onBlur={() => {
                  if (validateCard(formData.cardNumber)) {
                    setCardErrors((prev) => {
                      return prev.filter((item) => item !== "card");
                    });
                  } else {
                    setCardErrors((prev) => [...prev, "card"]);
                  }
                }}
                error={cardErrors.includes("card")}
                helperText={
                  cardErrors.includes("card") ? "Invalid card number" : ""
                }
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
                onBlur={() => validate("month")}
                error={cardErrors.includes("month")}
                helperText={
                  cardErrors.includes("month") ? "Invalid exp. month" : ""
                }
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
                name="expYear"
                placeholder="YY"
                value={formData.expYear}
                onChange={handleCardChanges}
                onBlur={() => validate("year")}
                error={cardErrors.includes("year")}
                helperText={
                  cardErrors.includes("year") ? "Invalid exp. year" : ""
                }
              />
            </Grid2>
            <Grid2 item size={{ sx: 5, sm: 4 }} sx={{ flex: 1 }}>
              <TextField
                required
                size="small"
                sx={{ flex: 1, width: "100%" }}
                type="text"
                label="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleCardChanges}
              />
            </Grid2>
          </Grid2>
        </>

        <Button
          variant="contained"
          color="success"
          sx={{ width: "70%", mt: "50px" }}
          type="submit"
        >
          complete payment
        </Button>
      </form>

      <Box className={styles["payment"]}></Box>
      <CustomAlert
        severity={"error"}
        message={"Please solve the errors and try again"}
        open={isAlertOpen}
      />
      {isSaveSuccess && (
        // <Zoom in={isSaveSuccess}>
        <Dialog open={true}>
          <DialogContent sx={{ width: "200px", height: "200px" }}>
            <Alert severity="success">Order Placed Successfully</Alert>
          </DialogContent>
        </Dialog>
        // </Zoom>
      )}
    </Box>
  );
}

export default PaymentPage;
