import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

class modal extends React.Component{

    render(){
    return(
        <Fragment>
            <Backdrop clicked={this.props.modalClose} show={this.props.show} />
            <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                // top:
                }}>
                <div className="Modal"
                style={{
                    opacity: this.props.show ? '1': '0',
                    top: this.props.show ? '20%' : '-10rem'
                    }}>
                    {this.props.children}
                </div>
            </div>
        </Fragment>
)}}

export default modal;