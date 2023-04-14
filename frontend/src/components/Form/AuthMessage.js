import React from "react";
import { useSelector } from "react-redux";

export const FailureMessage = () => {
  const user = useSelector((state) => state.user);
  return (
    user.message !== "" && (
      <div className="mt-3 mb-3 p-2 account-failure-container">
        <label className="account-failure-text">{user.message}</label>
      </div>
    )
  );
};
