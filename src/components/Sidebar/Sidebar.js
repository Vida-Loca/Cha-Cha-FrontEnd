import React, { useState } from "react";
import PropTypes from "prop-types";
import SideBarItem from "./SideBarItem/SdeBarItem";
import IconButton from "../button/IconButton";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes, beforeLink }) => {
  const [showNavBar, setShowNavBar] = useState({ show: false });

  const showNavBarHandler = () => {
    setShowNavBar({ show: !showNavBar.show });
  };
  return (
    // <div className={`${classes} ${showNavBar.show ? }`}>
    <div className={`${classes} ${showNavBar.show ? "show" : ""}`}>
      <IconButton clicked={showNavBarHandler} iconClass="fas fa-bars">
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
          >
            {navLink.navLink}
          </SideBarItem>
        );
      })}
    </div>
  );
};

Sidebar.propTypes = {
  navlinks: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  classes: PropTypes.string,
  eventId: PropTypes.string
};

export default Sidebar;
