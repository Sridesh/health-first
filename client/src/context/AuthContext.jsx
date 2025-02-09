import PropTypes from "prop-types";

import { createContext, useLayoutEffect, useReducer } from "react";
import { AuthReducer, LoaderReducer } from "../store/AuthReducer";
import api from "../api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(AuthReducer, null);
  const [isLoading, dispatchLoader] = useReducer(LoaderReducer, true);

  useLayoutEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("auth-patient/me");

      const user = response.data || null;

      dispatchUser({
        type: "SET_USER",
        data: user,
      });
    } catch (error) {
      console.log(error);

      dispatchUser({
        type: "REMOVE_USER",
      });
    } finally {
      dispatchLoader({
        type: "STOP_LOADER",
      });
    }
  };

  const login = async (email, password) => {
    try {
      await api.get("csrf-token");

      const response = await api.post("auth-patient/login", {
        email,
        password,
      });

      const { user } = response.data;

      dispatchUser({
        type: "SET_USER",
        data: user,
      });

      return response.data;
    } catch (error) {
      console.log("Error at login", error);
    }
  };

  const logout = async () => {
    try {
      await api.post("auth-patient/logout");

      dispatchUser({
        type: "REMOVE_USER",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
