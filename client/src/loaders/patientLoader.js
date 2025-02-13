import { redirect } from "react-router-dom";
import api from "../api/api";

export const patientLoader = async () => {
  try {
    await api.get("auth-patient/me");
    return null;
  } catch (error) {
    console.log(error);

    return redirect("/login");
  }
};
