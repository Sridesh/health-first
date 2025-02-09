import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

import styles from "./Drawer.module.css";
import { theme } from "../../theme";

import { usePaymentAccess } from "../../hooks/usePaymentAccess";

function PurchaseDrawer({ open, item, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { grantPaymentAccess } = usePaymentAccess();

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  const handleClick = () => {
    grantPaymentAccess();

    navigate("/purchases-payment", {
      state: {
        item,
        quantity,
      },
    });
  };

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => prev - 1);
  };

  return (
    <Drawer open={open} anchor="right" disableScrollLock={false}>
      <Box
        className={styles.container}
        sx={{ width: isMobile ? "calc(100vw - 40px)" : "500px" }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">Checkout</Typography>
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Stack gap={2} className={styles["product"]}>
          <Box
            component="img"
            src={item?.imageUrl}
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
            }}
            boxShadow={1}
          />
          <Typography
            variant="h5"
            sx={{ color: theme.palette.teal.main, fontWeight: "bold" }}
          >
            {item?.item_name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.light_gray.main }}
          >
            LKR {item?.price}
          </Typography>

          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            sx={{ mb: "20px" }}
          >
            <IconButton onClick={decrement} disabled={quantity === 1}>
              <RemoveRoundedIcon />
            </IconButton>
            <Typography
              sx={{
                padding: "10px",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={increment}
              disabled={quantity === item?.quantity}
            >
              <AddRoundedIcon />
            </IconButton>
          </Stack>

          <Divider width={"80%"} />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"80%"}
          >
            <Typography>Sub Total</Typography>
            <Typography>LKR {(item?.price * quantity).toFixed(2)}</Typography>
          </Stack>
          <Divider width={"80%"} />

          <Button
            color="success"
            sx={{ width: "400px", mt: "30px" }}
            variant="contained"
            onClick={handleClick}
          >
            Proceed to payment
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

PurchaseDrawer.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
};

export default PurchaseDrawer;
