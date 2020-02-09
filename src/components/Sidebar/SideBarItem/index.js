import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./SideBarItem.scss";

const SideBarItem = ({
  name,
  icon,
  children,
  beforeLink,
  mobileNavBarHandler
}) => {
  return (
    <NavLink
      to={`${beforeLink}/${name.toLowerCase()}`}
      className="SideBarItem"
      onClick={() => mobileNavBarHandler()}
    >
      <i className={icon} />
      {children}
    </NavLink>
  );
};

SideBarItem.defaultProps = {
  icon: "fab fa-bandcamp",
  beforeLink: "/",
  mobileNavBarHandler: null
};

SideBarItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  beforeLink: PropTypes.string,
  children: PropTypes.node.isRequired,
  mobileNavBarHandler: PropTypes.func
};

export default SideBarItem;
