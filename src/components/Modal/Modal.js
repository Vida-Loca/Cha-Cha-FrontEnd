import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

class modal extends React.Component{

    render(){
    return(
        <Fragment>
            <Backdrop clicked={this.props.modalClose} show={this.props.show} />
            <div style={{
                width: '95%',
                height: '100%',
                position: 'absolute',
                display: this.props.show ? 'flex': 'none',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-6rem'
                }}>
                <div className="Modal"
                style={{
                    opacity: this.props.show ? '1': '0',
                    // display: this.props.show ? 'none': 'none',
                    // top: this.props.show ? '20%' : '-30rem'
                    }}>
                    {this.props.children}
                </div>
            </div>
        </Fragment>
)}}

export default modal;