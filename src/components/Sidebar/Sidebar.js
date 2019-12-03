import React from "react";
import PropTypes from "prop-types";
import SideBarItem from "./SideBarItem/SdeBarItem";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes }) => {
  return (
    <div className={classes}>
      {navlinks.map(navLink => (
        <SideBarItem
          key={navLink.navLink}
          name={navLink.navLink}
          icon={navLink.iconClass}
        >
          {navLink.navLink}
        </SideBarItem>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  navlinks: PropTypes.objectOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  classes: PropTypes.string
};

export default Sidebar;
