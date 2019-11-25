import React from "react";
import PropTypes from "prop-types";
import SideBarItem from "./SideBarItem/SdeBarItem";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes, eventId }) => {
  return (
    <div className={classes}>
      {navlinks.map(navLink => {
        const eventIdtemp = eventId !== undefined ? `/event/${eventId}` : "";
        return (
          <SideBarItem
            key={navLink.navLink}
            name={navLink.navLink}
            icon={navLink.iconClass}
            beforeLink={eventIdtemp}
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
