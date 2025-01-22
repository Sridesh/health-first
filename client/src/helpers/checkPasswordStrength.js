export default function checkPassowrdStrength(password) {
  if (password === "") return null;

  let index = 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    index++;
  }
  if (/\d/.test(password)) {
    index++;
  }
  if (password.length > 8) {
    index++;
  }
  if (/[^\w\s]/.test(password)) {
    index++;
  }

  return {
    strength: index,
    color:
      index <= 1
        ? "red"
        : index === 2
        ? "orange"
        : index === 3
        ? "yellow"
        : "green",
  };
}
