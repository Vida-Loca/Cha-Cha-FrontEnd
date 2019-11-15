import React from 'react';
import SideBarItem from './SideBarItem/SdeBarItem';
import './SideBar.scss';

const Sidebar = (props) =>{

        let transformedNavLinks = props.navlinks.map( navLink => 
            (<SideBarItem key={navLink[0]} name={navLink[0]} icon={navLink[1]}>{navLink[0]}</SideBarItem>));

        return(
            <div className={props.classes}>
                {transformedNavLinks}
            </div>
        );
    
}

export default Sidebar;