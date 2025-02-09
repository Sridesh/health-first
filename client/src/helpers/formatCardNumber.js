export const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export const validateCard = (number) => {
  const regex = new RegExp("^[0-9]{16}$");
  if (!regex.test(number.replace(/\s/g, ""))) return false;

  return (
    number
      .replace(/\s/g, "")
      .split("")
      .reverse()
      .map((x) => parseInt(x))
      .map((x, idx) => (idx % 2 ? x * 2 : x))
      .map((x) => (x > 9 ? (x % 10) + 1 : x))
      .reduce((acc, x) => acc + x) %
      10 ===
    0
  );
};
