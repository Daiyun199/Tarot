import axios from "axios";

const api = axios.create({
  baseURL: "https://meowgic.azurewebsites.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    const token = user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default api;
