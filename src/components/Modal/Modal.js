import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';

class modal extends React.Component{

    render(){
    return(
        <Fragment>
            <Backdrop clicked={this.props.modalClose} show={this.props.show} />
            <div className="Modal"
            style={{
                opacity: this.props.show ? '1': '0',
                top: this.props.show ? '20%' : '-10rem'
                }}>
                {this.props.children}
            </div>
        </Fragment>
)}}

export default modal;