import React from 'react';
import './button.scss';

const button = (props) =>{
    return(
        <div>
            <button className={props.classes} onClick={props.clicked}>{props.children}</button>
        </div>
    );
}

export default button;