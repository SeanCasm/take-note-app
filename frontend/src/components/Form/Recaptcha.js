import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

export const Recaptcha = ({ handleReCaptcha }) => {
  const [size, setSize] = useState("normal");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setSize("compact");
      } else {
        setSize("normal");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="mb-3">
      <ReCAPTCHA
        size={size}
        sitekey={process.env.REACT_APP_SITE_KEY}
        onChange={handleReCaptcha}
      />
    </div>
  );
};
Recaptcha.propTypes = {
  handleReCaptcha: PropTypes.func,
};
