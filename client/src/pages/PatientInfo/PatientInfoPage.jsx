import { useLocation } from "react-router-dom";

import { Box, Divider, Stack, Typography } from "@mui/material";

import styles from "./PatientInfo.module.css";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import api from "../../api/api";
import CustomBuffer from "../../components/UI/CustomBuffer";

function PatientInfoPage() {
  const { id } = useLocation().state;

  const [patient, setPatient] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (id) {
      try {
        const fetch = async () => {
          const response = await api.get(`/admin/patient/${id}`);
          setPatient(response.data);
        };

        fetch();
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    console.log(patient, id);
  }, [patient, id]);

  if (isLoading || patient === null) {
    return <CustomBuffer />;
  }

  return (
    <Box className={styles.container}>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.green.main, ml: "30px" }}
      >
        {patient.first_name + " " + patient.last_name}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        sx={{ width: "80%", mt: "20px" }}
      >
        <Typography
          sx={{
            fontSize: "80%",
            color: theme.palette.gray.main,
            backgroundColor: theme.palette.bg_gray.main,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {patient.gender}
        </Typography>
        <Typography
          sx={{
            fontSize: "80%",
            color: theme.palette.gray.main,
            backgroundColor: theme.palette.bg_gray.main,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {patient.nic}
        </Typography>
        <Typography
          sx={{
            fontSize: "80%",
            color: theme.palette.gray.main,
            backgroundColor: theme.palette.bg_gray.main,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {patient.email}
        </Typography>
        <Typography
          sx={{
            fontSize: "80%",
            color: theme.palette.gray.main,
            backgroundColor: theme.palette.bg_gray.main,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {patient.phone_number}
        </Typography>
      </Stack>
      <Box sx={{ mt: "20px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "110%",
            color: theme.palette.gray.main,
            mt: "30px",
            ml: "50px",
          }}
        >
          Orders
        </Typography>
        <Stack direction={"column"} spacing={1}>
          {patient.orders &&
            patient.orders.map((order) => {
              return (
                <>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    key={order.order_number}
                    sx={{ p: "20px" }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: theme.palette.light_gray.main,
                          fontSize: "90%",
                        }}
                      >
                        {order.order_number}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.palette.light_gray.main,
                          fontSize: "90%",
                        }}
                      >
                        {order.total?.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: theme.palette.light_gray.main,
                        fontSize: "90%",
                      }}
                    >
                      {order.order_date}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.light_gray.main,
                        fontSize: "90%",
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Stack>
                  <Divider />
                </>
              );
            })}
        </Stack>
      </Box>
    </Box>
  );
}

export default PatientInfoPage;
