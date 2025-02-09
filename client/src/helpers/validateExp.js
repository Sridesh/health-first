export const validateMonth = (text) => {
  const date = parseInt(text);

  if (0 < date && date < 10) {
    return "0" + text;
  } else if (date < 13) {
    return text;
  } else {
    return false;
  }
};

export const validateYear = (year) => {
  if (parseInt(year) < 25) {
    return false;
  } else {
    return true;
  }
};
