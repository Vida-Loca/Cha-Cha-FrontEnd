import React from "react";
import "./button.scss";

const Button = ({ classes, clicked, children }) => (
  <div>
    <button className={classes} onClick={clicked}>
      {children}
    </button>
  </div>
);

export default Button;
