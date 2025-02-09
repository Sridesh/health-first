import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../hooks/useAuth";
import CustomBuffer from "../components/UI/CustomBuffer";

function PrivateRoute({ children, requiredRoles = [] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <CustomBuffer />;
  }

  if (!user) {
    <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    <Navigate to="/unauthorized" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.array,
};

export default PrivateRoute;
