import axios from "axios";
export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth/mongo`,
});
export const oAuthApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth/oauth`,
});
authApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "token": localStorage.getItem("token"),
  };
  return config;
});
