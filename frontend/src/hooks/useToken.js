import { useState } from "react";

export const useToken = () => {
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken.token);
  };
  return {
    saveToken,
    token,
  };
};
