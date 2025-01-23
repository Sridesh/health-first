import { regexStrings } from "../data";

export const ValidateNICNumber = (NIC) => {
  if (NIC.length === 12 && regexStrings.onlyNumbers.test(NIC)) {
    return true;
  } else if (
    NIC.length === 10 &&
    regexStrings.onlyNumbers.test(NIC.slice(0, 9)) &&
    NIC.charAt(NIC.length - 1).toLowerCase() === "v"
  ) {
    return true;
  } else return false;
};
