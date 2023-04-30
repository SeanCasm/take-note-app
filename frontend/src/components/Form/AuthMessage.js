import React, { useEffect } from "react";
import { useProfile } from "../../hooks/useProfile";

export const FailureMessage = () => {
  const { message, resetMessage } = useProfile();
  useEffect(() => {
    resetMessage();
  }, []);
  return (
    message !== "" && (
      <div className="mt-3 mb-3 p-2 account-failure-container">
        <label className="account-failure-text">{message}</label>
      </div>
    )
  );
};
