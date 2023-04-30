import React from "react";

export const PasswordField = ({ register, errors, hidePassword }) => {
  return (
    <div>
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <div className="input-group">
        <input
          type={hidePassword ? "password" : "text"}
          id="password"
          className="form-control"
          {...register("password", {
            required: "Password with at least 8 characters is required",
            minLength: 8,
          })}
        />
      </div>
      {errors.password && (
        <label className="alert-text">{errors.password?.message}</label>
      )}
    </div>
  );
};
