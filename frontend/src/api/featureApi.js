import axios from "axios";
export const featuresApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/feature`,
});
