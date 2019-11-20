import React from "react";
import "./Backdrop.scss";

const Backdrop = ({ clicked }) => (
  <div onClick={clicked} className="backdrop"></div>
);

export default Backdrop;
