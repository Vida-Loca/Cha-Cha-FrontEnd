import React from 'react';
import {NavLink} from 'react-router-dom';
import './SideBarItem.scss';

const sideBarItem = (props) => {

    return(
        <NavLink to={props.name.toLowerCase()} className="SideBarItem">
            <i className={props.icon}></i>
            {props.children}
        </NavLink>
    );
}

export default sideBarItem;