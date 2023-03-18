import axios from "axios";
export const bookApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/book`,
});
bookApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    token: localStorage.getItem("token"),
  };
  return config;
});
