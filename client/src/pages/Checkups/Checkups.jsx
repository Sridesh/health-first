import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./Checkups.module.css";
import { theme } from "../../theme";

import Header from "../../components/Header/Header";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import api from "../../api/api";

function Checkups() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selected, setSelected] = useState(null);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const categoriesSet = [...new Set(data.map((item) => item.category_name))];

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = `/checkups`;
        const response = await api.get(url);
        setData(response.data);

        const categoriesRes = await api.get("/checkups/categories");
        setCategories(categoriesRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (searchString === "") {
      setSearchedData(data);
    } else {
      setSearchedData(
        data.filter((item) =>
          item.checkup_name
            .toLowerCase()
            .includes(searchString.toLocaleLowerCase())
        )
      );
    }
  }, [data, searchString]);

  return (
    <Box className={styles["container"]}>
      <Header
        heading={"Health Checkups"}
        description={
          "Stay proactive with your health through our comprehensive checkup packages. Tailored to meet your needs, our checkups ensure early detection and better management of your well-being."
        }
        onChange={setSearchString}
      />
      <Box sx={{ width: isMobile ? "90%" : "70%" }}>
        {categoriesSet.map((category, index) => {
          const dataList = searchedData?.filter(
            (checkup) => checkup.category_name === category
          );
          return (
            <Stack key={index} className={styles["wrapper"]}>
              <Stack
                direction={"row"}
                gap={2}
                sx={{ mb: "5px", width: "100%" }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${
                      categories.find((item) => item.category_name === category)
                        ?.image_link
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: isMobile ? "20px" : "50px",
                    width: isMobile ? "20px" : "50px",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{ fontSize: "130%", color: theme.palette.green.main }}
                  >
                    {category}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.light_gray.main,
                      fontSize: "90%",
                    }}
                  >
                    {
                      categories.find((item) => item.category_name === category)
                        ?.description
                    }
                  </Typography>
                  <Divider sx={{ my: "10px" }} />
                </Box>
              </Stack>
              <Stack sx={{ width: "85%" }} direction={"column"} spacing={2}>
                {dataList.length > 0 ? (
                  dataList.map((item) => {
                    const isAvailable =
                      item.centers?.length !== 0 && item.centers[0] !== null;
                    return (
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        key={item.checkup_id}
                        sx={{
                          width: "100%",
                          bgcolor: "white",
                          "&:hover": { bgcolor: theme.palette.blue.main },
                          p: "10px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelected(item)}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.dark_gray.main,
                            fontWeight: 500,
                          }}
                        >
                          {item.checkup_name}
                        </Typography>
                        <Button
                          sx={{ fontSize: "75%" }}
                          size="small"
                          color={"success"}
                          variant="outlined"
                          disabled={!isAvailable}
                        >
                          {isAvailable ? "Book Appointment" : "Unavailable"}
                        </Button>
                      </Stack>
                    );
                  })
                ) : (
                  <NoDataMessage message={"data"} />
                )}
              </Stack>
            </Stack>
          );
        })}
      </Box>

      {/* Dialog */}
      <Dialog open={selected ? true : false} onClose={() => setSelected(null)}>
        <DialogTitle id="alert-dialog-title">
          {selected?.checkup_name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selected?.description}
          </DialogContentText>
          <Box
            sx={{
              borderRadius: "5px",
              bgcolor: theme.palette.blue.main,
              padding: "10px",
              mt: "10px",
            }}
          >
            <Stack
              direction="row"
              justifyContent={"space-between"}
              onClick={() => setIsTestsOpen(!isTestsOpen)}
              sx={{ cursor: "pointer" }}
            >
              <Typography sx={{ color: theme.palette.teal.main }}>
                Included Tests & Screenings
              </Typography>
              {isTestsOpen ? <ExpandMoreIcon /> : <ChevronLeftIcon />}
            </Stack>
            {isTestsOpen && <Divider sx={{ my: "10px" }} />}

            <Collapse in={isTestsOpen} orientation="vertical">
              <ul>
                {selected?.tests?.map((test) => (
                  <li key={test}>
                    <Typography sx={{ fontSize: "90%" }}>{test}</Typography>
                  </li>
                ))}
              </ul>
            </Collapse>
          </Box>

          {selected?.centers?.length !== 0 && selected?.centers[0] !== null ? (
            <Box
              sx={{
                borderRadius: "5px",
                bgcolor: theme.palette.blue.main,
                padding: "10px",
                mt: "10px",
              }}
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                sx={{ cursor: "pointer" }}
              >
                <Typography sx={{ color: theme.palette.teal.main }}>
                  Available Locations
                </Typography>
                {isLocationOpen ? <ExpandMoreIcon /> : <ChevronLeftIcon />}
              </Stack>
              {isLocationOpen && <Divider sx={{ my: "10px" }} />}

              <Collapse in={isLocationOpen} orientation="vertical">
                <ul>
                  {selected?.centers?.map((test) => (
                    <li key={test}>
                      <Typography sx={{ fontSize: "90%" }}>{test}</Typography>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </Box>
          ) : (
            <Alert severity="warning" sx={{ mt: "10px" }}>
              Currently Unavailable in Any Location
            </Alert>
          )}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ mt: "20px" }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.black.main }}>
              Price:{" "}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.black.main }}>
              LKR {selected?.price}.00
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Checkups;
