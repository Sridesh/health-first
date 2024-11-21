import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./ServiceList.module.css";
import { theme } from "../../theme";

import {
  Box,
  Button,
  Divider,
  Modal,
  Pagination,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function ServiceList({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    setPageData(data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
  }, [data, page]);

  const handleSelectClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const Element = ({ data }) => (
    <Box className={styles["element"]} sx={{ width: { xs: "80%", sm: "70%" } }}>
      <Box>
        <Typography sx={{ color: theme.palette.black.main, fontWeight: 500 }}>
          {data?.test_name}
        </Typography>
        <Typography sx={{ fontSize: "90%", color: theme.palette.teal.main }}>
          {data?.type}
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{ maxWidth: "50%" }}
      >
        <Button
          sx={{ fontSize: "75%" }}
          size="small"
          color="success"
          variant="outlined"
        >
          Book Appointment
        </Button>
        <Tooltip title="View More Info">
          <Button onClick={() => handleSelectClick(data)}>
            <InfoOutlinedIcon />
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );

  const ElementLoader = () => (
    <Box
      className={styles["element"]}
      sx={{ width: { xs: "80%", sm: "70%" }, mb: "10px" }}
    >
      <Box>
        <Skeleton animation="wave" height={15} width="150px" />
        <Skeleton animation="wave" height={10} width="100px" />
      </Box>

      <Skeleton animation="wave" height={40} width="30%" />
    </Box>
  );

  return (
    <Box className={styles["container"]}>
      <Box className={styles["container_list"]}>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.green.main, mb: "20px" }}
        >
          Select a service
        </Typography>
        {pageData.length > 0
          ? pageData.map((item) => (
              <>
                <Element data={item} />
                <Divider sx={{ width: "60%" }} />
              </>
            ))
          : [1, 2, 3].map(() => (
              <>
                <ElementLoader />

                <Divider sx={{ width: "60%" }} />
              </>
            ))}
        <Pagination
          color="primary"
          variant="outlined"
          page={page}
          count={Math.ceil(data.length / ITEMS_PER_PAGE)}
          onChange={(e, value) => setPage(value)}
          sx={{ mt: "25px" }}
        />
      </Box>

      {/* Service Info Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            maxHeight: "80%",
            overflow: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "5px",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%", mb: "20px" }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.black.main, fontWeight: 500 }}
              >
                {selectedItem?.test_name}
              </Typography>
              <Typography sx={{ color: theme.palette.teal.main }}>
                {selectedItem?.type}
              </Typography>
            </Box>
            <Button
              sx={{ fontSize: "75%" }}
              size="small"
              color="success"
              variant="outlined"
            >
              Book Appointment
            </Button>
          </Stack>
          <Typography sx={{ color: theme.palette.gray.main, mb: "10px" }}>
            {selectedItem?.description}
          </Typography>
          <Box
            sx={{
              padding: "10px",
              borderRadius: "5px",
              bgcolor: theme.palette.bg_blue.main,
            }}
          >
            <Typography
              sx={{
                color: theme.palette.teal.main,
                fontSize: "110%",
                mb: "5px",
              }}
            >
              Available Centres
            </Typography>
            <Stack direction={"column"} spacing={1}>
              {selectedItem?.centers?.map((center, index) => {
                console.log(center);

                return (
                  <Stack
                    direction={"row"}
                    spacing={1}
                    key={index}
                    sx={{ color: theme.palette.gray.main, mb: "5px" }}
                  >
                    <FmdGoodOutlinedIcon />
                    <Typography>{center}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

Element.propTypes = {
  data: PropTypes.object,
};

ServiceList.propTypes = {
  data: PropTypes.array,
};

export default ServiceList;
