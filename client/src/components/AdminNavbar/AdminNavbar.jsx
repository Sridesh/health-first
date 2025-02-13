import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Badge,
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import styles from "./AdminNavbar.module.css";
import { theme } from "../../theme";
import logo from "../../../public/icon.png";

import AvatarCircle from "../Avatar/AvatarCircle";
import { adminNavbarOptions } from "../../data";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function AdminNavbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [openOptions, setOpenOptions] = useState(false);
  const [openOptionsBar, setOpenOptionsBar] = useState(false);

  const { user } = useAuth();

  const { cart, isCartViewed } = useCart();

  const OptionsBar = () => (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      sx={{
        bgcolor: "white",
        borderRadius: "5px",
        position: isMobile ? "absolute" : "static",
        padding: isMobile ? "10px 30px" : 0,
        left: "120px",
        zIndex: 9,
      }}
    >
      {adminNavbarOptions.map((item, index) => {
        return (
          <Typography
            key={index}
            sx={{
              fontSize: "90%",
              color: theme.palette.teal.main,
              cursor: "pointer",
              ":hover": {
                color: theme.palette.green.main,
              },
            }}
          >
            <Link
              to={item.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.name}
            </Link>
          </Typography>
        );
      })}
    </Stack>
  );

  return (
    <Box className={styles.container}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ px: "15px", height: "100%" }}
      >
        <Box
          className={styles["logo"]}
          component="img"
          alt="Company logo"
          src={logo}
          onClick={() => navigate("/")}
        ></Box>
        {!isMobile ? (
          <OptionsBar />
        ) : (
          <Button onClick={() => setOpenOptionsBar(!openOptionsBar)}>
            <MenuRoundedIcon />
          </Button>
        )}
        <Stack
          direction={"row"}
          spacing={1.5}
          sx={{ height: "100%" }}
          alignItems={"center"}
        >
          <Badge
            variant="dot"
            color="error"
            badgeContent={!isCartViewed && cart.length > 0 ? 1 : 0}
          >
            <Box
              className={styles["container__user-info"]}
              sx={{
                bgcolor: theme.palette.blue.main,
                justifyContent: "center",
              }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartRoundedIcon
                sx={{
                  cursor: "pointer",
                  color: theme.palette.teal.main,
                }}
              />
            </Box>
          </Badge>

          <Box
            className={styles["container__user-info"]}
            sx={{
              bgcolor: theme.palette.blue.main,
              justifyContent: "center",
            }}
          >
            <NotificationsNoneRoundedIcon
              sx={{
                cursor: "pointer",
                color: theme.palette.teal.main,
              }}
            />
          </Box>
          <Box
            className={styles["container__user-info"]}
            sx={{ bgcolor: theme.palette.blue.main }}
          >
            <ExpandMoreIcon
              sx={{
                cursor: "pointer",
                ml: "5px",
                color: theme.palette.teal.main,
              }}
              onClick={() => setOpenOptions(!openOptions)}
            />
            <AvatarCircle name={user?.first_name + " " + user?.last_name} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AdminNavbar;
