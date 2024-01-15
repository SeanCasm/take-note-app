import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center">
      <header className="mb-5">
        <h1>
          <strong>Remember all and take note about everything</strong>
        </h1>
      </header>
      <div className="mb-5">
        <h3>All your life experiences in one site</h3>
      </div>
      <button
        className="mb-5 button-submit animation-u-blind bg-main"
        onClick={() => {
          navigate("/signup");
        }}
      >
        <p>Sign up now for free</p>
      </button>
      <div>
        <a href="/login">
          <u>You have an account? Log in now</u>{" "}
        </a>
      </div>
    </section>
  );
};
