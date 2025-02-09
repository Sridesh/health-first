import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PaymentAccessContext = createContext();

const PaymentAccessProvider = ({ children }) => {
  const [isAccessValid, setIsAccessValid] = useState(false);

  const grantPaymentAccess = () => {
    setIsAccessValid(true);
  };

  const revokePaymentAccess = () => {
    setIsAccessValid(false);
  };

  return (
    <PaymentAccessContext.Provider
      value={{ isAccessValid, grantPaymentAccess, revokePaymentAccess }}
    >
      {children}
    </PaymentAccessContext.Provider>
  );
};

PaymentAccessProvider.propTypes = {
  children: PropTypes.node,
};

export { PaymentAccessContext, PaymentAccessProvider };
