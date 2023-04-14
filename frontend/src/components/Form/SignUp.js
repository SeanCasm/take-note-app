import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useProfile } from "../../hooks/useProfile";
import { PasswordField } from "./PasswordField";
import { Recaptcha } from "./Recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import { ButtonSubmit } from "../Buttons/ButtonSubmit";
import { FailureMessage } from "./AuthMessage";

const schema = yup
  .object({
    name: yup
      .string("Name musn't have numbers and symbols")
      .required("Name is required"),
    lastname: yup
      .string("Last name musn't have numbers and symbols")
      .required("Last name is required"),
    password: yup
      .string()
      .required()
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: yup
      .string()
      .required()
      .min(8, "Password must have at least 8 characters")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    email: yup
      .string()
      .email("Not a valid email address format")
      .required("Email address is required"),
  })
  .required();

export const SignUp = () => {
  const [reCaptcha, setReCaptcha] = useState("");
  const { createUser, googleLogin } = useProfile();
  const [hidePassword, setHidePassword] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    const { password, confirmPassword } = data;
    if (
      reCaptcha !== "" &&
      reCaptcha !== null &&
      password === confirmPassword
    ) {
      createUser(data);
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setHidePassword(!hidePassword);
  };
  const handleReCaptcha = (value) => {
    setReCaptcha(value);
  };
  return (
    <form className="panel container" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 row">
        <div className="col">
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name here"
            {...register("name")}
          />
        </div>
        <div className="col">
          <input
            type="text"
            id="lastname"
            className="form-control"
            placeholder="Last name here"
            {...register("lastname")}
          />
        </div>
      </div>
      {errors.name && (
        <label className="alert-text d-block mb-2">
          {errors.name?.message}
        </label>
      )}
      {errors.lastname && (
        <label className="alert-text d-block mb-2">
          {errors.lastname?.message}
        </label>
      )}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <label className="alert-text">{errors.email?.message}</label>
        )}
      </div>
      <div className="mb-3">
        <PasswordField
          register={register}
          errors={errors}
          hidePassword={hidePassword}
        />
        <button onClick={handlePassword}>
          {hidePassword && <AiOutlineEye className="icon-md" />}
          {!hidePassword && <AiOutlineEyeInvisible className="icon-md" />}
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Confirm password
        </label>
        <input
          type={hidePassword ? "password" : "text"}
          id="confirmPassword"
          className="form-control"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <label className="alert-text">
            {errors.confirmPassword?.message}
          </label>
        )}
      </div>

      <Recaptcha handleReCaptcha={handleReCaptcha} />
      <FailureMessage />
      <ButtonSubmit disabled={false} text="Sign up" />
      <div className="mt-5 text-center">
        <div className="mb-3">
          <p>Or use a google account</p>
        </div>
        <GoogleLogin
          auto_select
          size="large"
          onSuccess={({ credential }) => {
            googleLogin(credential);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </form>
  );
};
