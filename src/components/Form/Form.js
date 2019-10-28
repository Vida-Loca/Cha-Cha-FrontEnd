import React, {Component} from 'react';

class Form extends Component {
    render() {
        return(
            <form className="FormContainer" action={this.props.action} method={this.props.method}>
                {this.props.children}
            </form>
        );
    }
}

export default Form;