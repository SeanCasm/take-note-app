import React from "react";
import { GrNotes } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Logo = () => {
  const { status } = useSelector((state) => state.user);
  return (
    <Link
      className="d-flex align-items-center"
      to={status === "not-logged" ? "home" : "main"}
    >
      <GrNotes className="logo" />
      <h3 className="site-name">TakeNote</h3>
    </Link>
  );
};
