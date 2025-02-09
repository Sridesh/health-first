import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:3001/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let csrfTokenPromise = null;

const getCsrfToken = async () => {
  try {
    if (!csrfTokenPromise) {
      csrfTokenPromise = api.get("csrf-token");
    }
    const response = await csrfTokenPromise;
    const token = response.data.token;
    if (!token) {
      throw new Error("No CSRF token received");
    }
    return token;
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
    csrfTokenPromise = null;
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (config.url === "csrf-token") {
      return config;
    }

    try {
      const token = await getCsrfToken();
      if (token) {
        config.headers["X-CSRF-TOKEN"] = token;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && error.config?.url !== "csrf-token") {
      csrfTokenPromise = null; // Reset token promise on CSRF error
    }
    return Promise.reject(error);
  }
);

export default api;
