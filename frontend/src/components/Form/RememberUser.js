import React from "react";
export const RememberUser = ({ setRemember }) => {
  return (
    <div className="mb-3 d-flex align-items-center">
      <input
        id="check"
        type="checkbox"
        className="form-check-input checkbox"
        onChange={(e) => {
          setRemember(e.target.checked);
        }}
      />
      <label className="d-inline ms-2" htmlFor="check">
        Remember me
      </label>
    </div>
  );
};
