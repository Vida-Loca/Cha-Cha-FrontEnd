import React from 'react';
import SideBarItem from './SideBarItem/SdeBarItem';
import './SideBar.scss';

const Sidebar = (props) =>{

        let transformedNavLinks = props.navlinks.map( navLink => 
            (<SideBarItem key={navLink} name={navLink}>{navLink}</SideBarItem>));

        return(
            <div className={props.classes}>
                {transformedNavLinks}
            </div>
        );
    
}

export default Sidebar;