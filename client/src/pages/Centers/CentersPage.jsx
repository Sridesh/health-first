import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import styles from "./Centers.module.css";
import { theme } from "../../theme";

import api from "../../api/api";
import Header from "../../components/Header/Header";
import NoDataMessage from "../../components/NoDataMessage/NoDataMessage";
import MapComponent from "../../components/MapComponent/MapComponent";

function CentersPage() {
  const [centers, setCenters] = useState([]);
  const [searchString, setSearchString] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/centers");
        setCenters(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <Box className={styles.container}>
      <Header
        heading={"Our Centers"}
        description={
          "Explore our trusted medical centers, including hospitals and labs, dedicated to providing expert care and advanced diagnostics. With state-of-the-art facilities and skilled professionals, we ensure high-quality healthcare tailored to your needs."
        }
        onChange={setSearchString}
      />

      <Grid2 container gap={3} className={styles["list-container"]}>
        {centers.length > 0 ? (
          centers.map((center) => {
            return (
              <Grid2
                item
                size={{ xs: 12, sm: 5 }}
                className={styles["list_item"]}
                key={center.center_id}
                sx={{
                  backgroundColor: "white",
                  padding: isMobile ? "10px" : 0,
                }}
                boxShadow={1}
              >
                <>
                  <Box
                    component="img"
                    src={center.image_link}
                    className={styles["item_image"]}
                    sx={{ mr: isMobile ? "10px" : 0 }}
                  />
                  <Box className={styles["item_text"]}>
                    <Box>
                      <Typography
                        variant={"h6"}
                        sx={{
                          color: theme.palette.teal.main,
                          fontWeight: "bold",
                          fontSize: isMobile && "15px",
                        }}
                      >
                        {center.center_name}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.green.main,
                          fontWeight: "semibold",
                        }}
                      >
                        {center.city}, {center.district}
                      </Typography>
                    </Box>

                    <Stack direction={"column"}>
                      <Button
                        size="small"
                        sx={{
                          justifyContent: "flex-start",
                        }}
                        startIcon={!isMobile && <LocalPhoneIcon />}
                      >
                        {isMobile ? <LocalPhoneIcon /> : center.hotline}
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          justifyContent: "flex-start",
                        }}
                        startIcon={!isMobile && <EmailRoundedIcon />}
                      >
                        {isMobile ? <EmailRoundedIcon /> : center.mail}
                      </Button>
                      {isMobile && (
                        <Button
                          sx={{
                            justifyContent: "flex-start",
                          }}
                          size="small"
                        >
                          <LocationOnIcon />
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </>
                {!isMobile && (
                  <MapComponent
                    height={"150px"}
                    width={"190px"}
                    url={"6.911202107172833, 79.88765354139043"}
                  />
                )}
              </Grid2>
            );
          })
        ) : (
          <NoDataMessage message={"centers"} />
        )}
      </Grid2>
    </Box>
  );
}

export default CentersPage;
