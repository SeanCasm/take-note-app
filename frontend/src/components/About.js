import React from "react";
import { Copyright } from "./Copyright";
export const About = () => {
  return (
    <main className="container">
      <h2>About TakeNote</h2>
      <hr />
      <h4>
        Web site created using MERN stack,{" "}
        <a
          href="https://axios-http.com/docs/intro"
          target="_blank"
          rel="noreferrer"
        >
          <span className="axios">Axios</span>
        </a>
        ,{" "}
        <a
          href="https://getbootstrap.com/docs/5.2/getting-started/introduction/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="bootstrap">Bootstrap</span>
        </a>{" "}
        and Google OAuth 2.0. No major updates are coming.
        <br />
        Application created only for proffesional purposes, you are able to
        visit my{" "}
        <a
          href="https://github.com/SeanCasm?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          <span className="github">Github</span>
        </a>{" "}
        portfolio if you want to see more projects I've been created.
        <br />
      </h4>
      <Copyright />
    </main>
  );
};
