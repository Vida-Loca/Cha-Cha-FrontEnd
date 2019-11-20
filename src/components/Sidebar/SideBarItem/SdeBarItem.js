import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBarItem.scss";

const sideBarItem = ({ name, icon, children }) => {
  return (
    <NavLink to={name.toLowerCase()} className="SideBarItem">
      <i className={icon}></i>
      {children}
    </NavLink>
  );
};

export default sideBarItem;
