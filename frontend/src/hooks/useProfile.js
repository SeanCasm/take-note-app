import { userApi, authApi, oAuthApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  onLogSuccess,
  onLogError,
  onLogout,
  onResetMessage,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useToken } from "./useToken";

export const useProfile = () => {
  const { lastname, message, status, name } = useSelector(
    (state) => state.user
  );
  const { saveToken } = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = async (credential) => {
    await oAuthApi
      .post("/", { credential })
      .then(({ data }) => {
        dispatch(onLogSuccess(data.user));
        saveToken(data.token);
        localStorage.setItem("isLogged", true);
        const { name, lastname, email } = data.user;
        localStorage.setItem("user", JSON.stringify({ name, lastname, email }));
        navigate(`../home`, { replace: true });
      })
      .catch(({ response }) => {
        dispatch(onLogError(response.data.errors[0].msg));
        console.log(response.data.errors[0].msg);
      });
  };

  const createUser = async (nUser = {}) => {
    await userApi
      .post("", nUser)
      .then(({ data }) => {
        console.log(data);
        const { email, password } = nUser;
        login(email, password);
      })
      .catch(({ response }) => {
        dispatch(onLogError(response.data.errors[0].msg));
        console.log(response.data.errors[0].msg);
      });
  };

  const renew = async (token = "") => {
    await oAuthApi.post("", token).then(({ data }) => {
      dispatch(onLogSuccess(data.user));
      saveToken(data.token);
    });
  };

  const login = async (email = "", password = "") => {
    await authApi
      .post("/", { email, password })
      .then(({ data }) => {
        const { name, lastname } = data.user;
        dispatch(onLogSuccess(data.user));
        saveToken(data.token);
        localStorage.setItem("user", JSON.stringify({ name, lastname, email }));
        localStorage.setItem("isLogged", true);
        navigate(`../home`, { replace: true });
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(onLogError(response.data.msg));
      });
  };

  const activateSession = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    dispatch(onLogSuccess(userData));
    navigate("/home", { replace: true });
  };

  const logout = () => {
    dispatch(onLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLogged", false);
    navigate("/home", { replace: true });
  };

  const resetMessage = () => {
    dispatch(onResetMessage());
  };

  return {
    createUser,
    login,
    googleLogin,
    renew,
    name,
    lastname,
    message,
    status,
    activateSession,
    logout,
    resetMessage
  };
};
