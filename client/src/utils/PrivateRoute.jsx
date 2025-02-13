import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../hooks/useAuth";
import CustomBuffer from "../components/UI/CustomBuffer";
import { useEffect } from "react";

function PrivateRoute({ children, requiredRoles = [] }) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  if (isLoading) {
    return <CustomBuffer />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
  requiredRoles: PropTypes.array,
};

export default PrivateRoute;
