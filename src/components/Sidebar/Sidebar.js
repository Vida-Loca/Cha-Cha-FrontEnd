import React from 'react';
import SideBarItem from './SideBarItem/SdeBarItem';

const Sidebar = (props) =>{

        // generates NavLinks using component SideBarItems
        let transformedNavLinks = Object.keys({...props.navlinks}).map(item => {
            let activity = props.navlinks[item];
            return <SideBarItem 
                clicked={props.clicked} 
                name={item} 
                key={item} 
                active={activity} 
    
                    >{item}</SideBarItem>
        });

        
        // console.log(Object.keys(kok));

        return(
            <div className={props.classes}>
                {transformedNavLinks}
            </div>
        );
    
}

export default Sidebar;