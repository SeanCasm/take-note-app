import React from "react";
import { BiCopyright } from "react-icons/bi";

export const Copyright = ({ colorType = "dark" }) => {
  const finalColor = colorType === "dark" ? "black" : "white";
  return (
    <div>
      <span style={{ color: finalColor }}>
        Copyright{<BiCopyright />} Todos los derechos reservados
      </span>
    </div>
  );
};
