import React from 'react';

const sideBarItem = (props) => {
    var active = props.active ? "active" : "";
    active = active + " SideBarItem";
    console.log(active);
    return(
        <div className={active}>
            {props.children}
        </div>
    );
}

export default sideBarItem;