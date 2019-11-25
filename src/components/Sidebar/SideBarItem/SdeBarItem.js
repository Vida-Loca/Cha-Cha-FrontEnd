import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./SideBarItem.scss";

const SideBarItem = ({ name, icon, children, beforeLink }) => {
  return (
    <NavLink to={`${beforeLink}/${name.toLowerCase()}`} className="SideBarItem">
      <i className={icon} />
      {children}
    </NavLink>
  );
};

SideBarItem.defaultProps = {
  icon: "fab fa-bandcamp",
  beforeLink: "/"
};

SideBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  beforeLink: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default SideBarItem;
