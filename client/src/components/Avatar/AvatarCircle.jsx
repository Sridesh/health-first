import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import tinycolor from "tinycolor2";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, size, textSize) {
  return {
    sx: {
      bgcolor: tinycolor(tinycolor(stringToColor(name)).lighten().toString())
        .lighten()
        .toString(),
      color: tinycolor(tinycolor(stringToColor(name)).darken().toString())
        .darken()
        .toString(),
      height: size ? size : "100%",
      width: size ? size : "auto",
      aspectRatio: "1/1",
      fontSize: textSize ?? "95%",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function AvatarCircle({ name, size, textSize }) {
  return <Avatar {...stringAvatar(name, size, textSize)} />;
}

AvatarCircle.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  textSize: PropTypes.string || PropTypes.number,
};

export default AvatarCircle;
