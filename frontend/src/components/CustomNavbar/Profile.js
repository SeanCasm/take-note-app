import React from "react";
import { useProfile } from "../../hooks/useProfile";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const Profile = () => {
  const { name, lastname, logout } = useProfile();

  return (
    <div className="ms-lg-auto">
      <p
        style={{ fontSize: "1.2em", display: "inline" }}
      >{`${name} ${lastname}`}</p>
      <button onClick={logout}>
        <RiLogoutBoxRLine className="icon-sm" color="tomato" />
      </button>
    </div>
  );
};
