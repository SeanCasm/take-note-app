import axios from "axios";
export const notesAPi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/note`,
});
notesAPi.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      "token": localStorage.getItem("token"),
    };
    return config;
  });
  