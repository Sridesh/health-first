import PropTypes from "prop-types";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import CustomProgress from "../CustomProgress/CustomProgress";
import { Box, Typography } from "@mui/material";
import { getCoordinates } from "../../helpers/getCoordinates";

// const apiKey = import.meta.env.GMAPS_API_KEY;

function MapComponent({ height, width, url }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD21A5xaEuiqzomq0264QfPb19aZ9g3F-w",
  });

  const mapContainerStyle = {
    width,
    height,
  };

  const center = getCoordinates(url) || { lat: 48.8583736, lng: 2.2922926 };

  if (loadError)
    return (
      <Box>
        <Typography color="error">Error Loading Maps</Typography>
      </Box>
    );

  if (!isLoaded) return <CustomProgress />;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
}

MapComponent.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  url: PropTypes.string,
};

export default MapComponent;
