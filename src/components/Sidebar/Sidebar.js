import React from "react";
import SideBarItem from "./SideBarItem/SdeBarItem";
import "./SideBar.scss";

const Sidebar = ({ navlinks, classes }) => {
  return (
    <div className={classes}>
      {navlinks.map((navLink, key) => (
        <SideBarItem key={key} name={navLink.navLink} icon={navLink.iconClass}>
          {navLink.navLink}
        </SideBarItem>
      ))}
    </div>
  );
};

export default Sidebar;
