import { useContext } from "react";
import { PaymentAccessContext } from "../context/PaymentAccess";

export const usePaymentAccess = () => {
  const context = useContext(PaymentAccessContext);

  if (!context) {
    throw new Error("usePaymentAccess must be used within AuthProvider");
  }

  return context;
};
