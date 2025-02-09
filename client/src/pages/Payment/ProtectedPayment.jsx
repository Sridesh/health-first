import PropTypes from "prop-types";
import { usePaymentAccess } from "../../hooks/usePaymentAccess";
import { Navigate } from "react-router-dom";

function ProtectedPayment({ children }) {
  const { isAccessValid } = usePaymentAccess();

  // if (!isAccessValid) {
  //   return <Navigate to="/invalid-redirect" replace />;
  // }

  return children;
}

ProtectedPayment.propTypes = {
  children: PropTypes.node,
};

export default ProtectedPayment;
