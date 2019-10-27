import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) =>{
    return(
        <Fragment>
            <Backdrop clicked={props.modalClose} show={props.show} />
            <div className="Modal"
            style={{
                transform: props.show ? 'translateY(0)': 'translateyY(-100vh)',
                opacity: props.show ? '1': '0',
                display: props.show ? 'block' : 'none'
                }}
            >
                {props.children}
            </div>
        </Fragment>
)}

export default modal;