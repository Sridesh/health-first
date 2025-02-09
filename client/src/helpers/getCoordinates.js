export const getCoordinates = (url) => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);
  if (match) {
    console.log({
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    });

    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[2]),
    };
  }
  return null;
};
