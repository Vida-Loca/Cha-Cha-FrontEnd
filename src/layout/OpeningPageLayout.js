import React from 'react';

const openingPageLayout = (props) =>{
    return(
        <div className="FirstLayout">
            <div className="bg-curved"></div>
            {props.children}
        </div>
    );
}

export default openingPageLayout;