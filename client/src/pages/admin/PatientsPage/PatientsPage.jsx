import { useEffect, useState } from "react";

import styles from "./PatientsPage.module.css";
import { theme } from "../../../theme";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import api from "../../../api/api";
import CustomProgress from "../../../components/CustomProgress/CustomProgress";
import { useNavigate } from "react-router-dom";

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await api.get("/admin/patients");
        setPatients(response.data);
      };

      fetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }, []);

  if (isLoading) return <CustomProgress />;

  return (
    <Box className={styles.container}>
      <Typography
        variant="h6"
        sx={{ color: theme.palette.teal.main, width: "90%", textAlign: "left" }}
      >
        Patients
      </Typography>
      <Stack direction={"column"} spacing={2} sx={{ padding: "20px" }}>
        {patients.map((patient) => {
          return (
            <Stack
              direction={"row"}
              key={patient.user_uuid}
              sx={{
                width: "700px",
                heigh: "50px",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
              boxShadow={1}
              justifyContent={"space-between"}
            >
              <Box>
                <Typography sx={{ color: theme.palette.green.main }}>
                  {patient.first_name + " " + patient.last_name}
                </Typography>
                <Typography
                  sx={{ color: theme.palette.light_gray.main, fontSize: "80%" }}
                >
                  {patient.gender}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.light_gray.main,
                    textAlign: "right",
                    fontSize: "80%",
                  }}
                >
                  {patient.phone_number}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.light_gray.main,
                    fontSize: "80%",
                    textAlign: "right",
                  }}
                >
                  {patient.email}
                </Typography>
              </Box>
              <IconButton
                onClick={() =>
                  navigate(`patient-info`, { state: { id: patient.user_uuid } })
                }
              >
                <ArrowOutwardIcon color="primary" />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}

export default PatientsPage;
