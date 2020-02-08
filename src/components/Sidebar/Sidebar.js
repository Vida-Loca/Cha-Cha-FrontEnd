import React, { useState } from "react";
import PropTypes from "prop-types";
import SideBarItem from "./SideBarItem/SdeBarItem";
import { IconButton } from "../Button/Index";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes, beforeLink }) => {
  const [showNavBar, setShowNavBar] = useState({ show: false });

  const toggleNavBarHandler = () => {
    setShowNavBar({ show: !showNavBar.show });
  };
  const hideNavBarHandler = () => {
    setShowNavBar({ show: false });
  };
  return (
    <div className={`${classes} ${showNavBar.show ? "show" : ""}`}>
      <IconButton clicked={toggleNavBarHandler} iconClass="fas fa-bars">
        X
      </IconButton>
      {navlinks.map(navLink => {
        const tempBeforeLink = beforeLink !== undefined ? beforeLink : "";
        return (
          <SideBarItem
            key={navLink.navLink}
            name={navLink.navLink}
            icon={navLink.iconClass}
            beforeLink={tempBeforeLink}
            mobileNavBarHandler={hideNavBarHandler}
          >
            {navLink.navLink}
          </SideBarItem>
        );
      })}
    </div>
  );
};
Sidebar.defaultProps = {
  classes: "",
  beforeLink: ""
};

Sidebar.propTypes = {
  navlinks: PropTypes.node.isRequired,
  classes: PropTypes.string,
  beforeLink: PropTypes.string
};

export default Sidebar;
