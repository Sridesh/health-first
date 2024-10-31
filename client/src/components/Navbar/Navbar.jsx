import { Box, Stack, Typography, Zoom } from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";

import styles from "./Navbar.module.css";
import logo from "../../../public/icon.png";
import { theme } from "../../theme";

import AvatarCircle from "../Avatar/AvatarCircle";
import { useState } from "react";

function Navbar() {
  const [openOptions, setOpenOptions] = useState(false);

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
        <Stack direction={"row"} spacing={2}>
          {["Services", "Doctors", "About", "Contact"].map((item, index) => {
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
                {item}
              </Typography>
            );
          })}
        </Stack>
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
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <PermIdentityRoundedIcon />
            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Profile
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <LogoutRoundedIcon />
            <Typography sx={{ fontSize: "80%", fontWeight: "bold" }}>
              Logout
            </Typography>
          </Stack>
        </Box>
      </Zoom>
    </Box>
  );
}

export default Navbar;
