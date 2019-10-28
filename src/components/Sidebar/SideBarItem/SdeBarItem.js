import React from 'react';

const sideBarItem = (props) => {
    var active = props.active ? "active" : "";
    active = active + " SideBarItem";
    return(
        <div className={active} onClick={() => props.clicked(props.name)}>
            {props.children}
        </div>
    );
}

export default sideBarItem;