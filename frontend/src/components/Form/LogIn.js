import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useProfile } from "../../hooks/useProfile";
import { ButtonSubmit } from "../Buttons/ButtonSubmit";
import { FailureMessage } from "./AuthMessage";

const schema = yup
  .object({
    password: yup
      .string()
      .required()
      .min(8, "Password must have at least 8 characters"),
    email: yup
      .string()
      .email("Not a valid email address format")
      .required("Email address is required"),
  })
  .required();

export const LogIn = () => {
  const { login, googleLogin } = useProfile();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = ({ email, password }) => {
    login(email, password);
  };
  return (
    <form className="panel" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <label className="alert-text">{errors.email?.message}</label>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          {...register("password")}
        />
        {errors.password && (
          <label className="alert-text">{errors.password?.message}</label>
        )}
      </div>
      <FailureMessage />
      <ButtonSubmit disabled={false} text="Log in" />
      <div className="mt-3 text-center">
        <p>Or try with your google account</p>
        <div className="mt-3">
          <GoogleLogin
            onSuccess={({ credential }) => {
              googleLogin(credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </form>
  );
};
