import React from "react";
import PropTypes from "prop-types";
import SideBarItem from "./SideBarItem/SdeBarItem";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes, beforeLink }) => {
  return (
    <div className={classes}>
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
