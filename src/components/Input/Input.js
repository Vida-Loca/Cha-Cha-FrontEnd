import React from 'react';

const input = (props) => {
    return(
        <div className="input-container">
            <span>{props.placeholder}</span>
            <div>
                <i class="fas fa-user"></i>
                <input 
                    className=""
                    type={props.type} 
                    placeholder={props.placeholder} 
                    name={props.name} />
                </div>
        </div>
    );
}

export default input;