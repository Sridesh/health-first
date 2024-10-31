import { useState } from "react";

import styles from "./Sidebar.module.css";
import { theme } from "../../theme";

import {
  Box,
  Button,
  Collapse,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import AvatarCircle from "../Avatar/AvatarCircle";

function Sidebar() {
  const [open, setOpen] = useState(true);

  const options = [
    {
      icon: <DashboardOutlinedIcon />,
      text: "Dashboard",
      link: "dashboard",
    },
    {
      icon: <MedicalServicesOutlinedIcon />,
      text: "My Activity",
      link: "activity",
    },
    {
      icon: <SettingsOutlinedIcon />,
      text: "Settings",
      link: "settings",
    },
  ];

  return (
    <Box className={styles["container"]}>
      {/* <Collapse orientation="horizontal" in={open} collapsedSize={100}> */}
      <Stack
        direction={"column"}
        spacing={2}
        className={styles["container_profile"]}
        sx={{
          width: open ? "300px" : "50px",
          transition: "width 300ms ease-in-out",
        }}
      >
        <Box
          width={"100%"}
          height={"50px"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button sx={{ borderRadius: "50px", paddingX: 0, color: "white" }}>
            {open ? (
              <ChevronLeftIcon onClick={() => setOpen(false)} />
            ) : (
              <ChevronRightIcon onClick={() => setOpen(true)} />
            )}
          </Button>
        </Box>
        <Divider
          variant="middle"
          flexItem
          sx={{ bgcolor: theme.palette.bg_blue.main }}
        />
        <Collapse in={open} orientation="vertical" sx={{ width: "100%" }}>
          <Stack
            direction={"column"}
            spacing={0.5}
            sx={{
              alignItems: "center",
              width: "100%",
              mb: "15px",
            }}
          >
            <Box>
              <AvatarCircle
                name={"Sridesh Fernando"}
                size={"80px"}
                textSize={"25px"}
              />
            </Box>
            <Typography variant="h6">Sridesh Fernando</Typography>
            <Typography sx={{ fontSize: "90%" }}>
              Customer ID : 1234567
            </Typography>
          </Stack>
        </Collapse>
        {open && (
          <Divider
            variant="middle"
            flexItem
            sx={{ bgcolor: theme.palette.bg_blue.main }}
          />
        )}
        <Stack
          direction="column"
          spacing={0.5}
          width="100%"
          justifyContent={"center"}
          alignItems={"center"}
        >
          {options.map((option) => (
            <MenuItem
              key={option.text}
              sx={{
                p: "10px",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
                spacing={1}
              >
                <Box>{option.icon}</Box>
                {open && (
                  <Collapse in={open} orientation="horzintal">
                    <Typography>{option.text}</Typography>
                  </Collapse>
                )}
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Stack>
      {/* </Collapse> */}
    </Box>
  );
}

export default Sidebar;
