import { useState } from "react";
import { Link } from "react-router-dom";

import {
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

import styles from "./Navbar.module.css";
import { theme } from "../../theme";
import logo from "../../../public/icon.png";

import AvatarCircle from "../Avatar/AvatarCircle";
import { navbarOptions } from "../../data";

function Navbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openOptions, setOpenOptions] = useState(false);
  const [openOptionsBar, setOpenOptionsBar] = useState(false);

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
      {navbarOptions.map((item, index) => {
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
    <Box className={styles["container"]}>
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
          <Box
            className={styles["container__user-info"]}
            sx={{ bgcolor: theme.palette.blue.main, justifyContent: "center" }}
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
            <AvatarCircle name={"Sridesh Fernando"} />
          </Box>
        </Stack>
      </Stack>
      <Zoom in={openOptions}>
        <Box
          className={styles["user-options"]}
          sx={{
            bgcolor: theme.palette.bg_blue.main,
            color: theme.palette.teal.main,
          }}
          boxShadow={1}
        >
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              width: "100%",
              mt: "10px",
              ":hover": {
                bgcolor: theme.palette.blue.main,
              },
            }}
          >
            <PermIdentityRoundedIcon />
            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Profile
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              width: "100%",
              mt: "10px",
              ":hover": {
                bgcolor: theme.palette.blue.main,
              },
            }}
          >
            <LogoutRoundedIcon />
            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Logout
            </Typography>
          </Stack>
        </Box>
      </Zoom>
      {isMobile && openOptionsBar && <OptionsBar />}
    </Box>
  );
}

export default Navbar;
