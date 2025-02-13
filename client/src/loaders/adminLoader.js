import { redirect } from "react-router-dom";
import api from "../api/api";

export const adminLoader = async () => {
  try {
    await api.get("auth-admin/me");
    return null;
  } catch (error) {
    console.log(error);
    return redirect("/auth/admin-login");
  }
};
