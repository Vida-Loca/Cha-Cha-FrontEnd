import React from 'react';
import Button from '../components/button/Button';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';
import Form from '../components/Form/Form';
// import {Link} from 'react-router-dom';

class openingPageLayout extends React.Component{
    state = {
        chooseForm: false,
        show: false
      }


        hideModal = () => {
            this.setState({show: false});  
        }
        showModal = () => {
            this.setState({show: true});  
        }

        openLogIn = () => {
            this.showModal();
            this.setState({chooseForm: true});
        }

        openRegister = () => {
            this.showModal();
            this.setState({chooseForm: false});
        }


    loginFrom = () => {
        return(
            <Form>
                <Input icon="fas fa-user" type="text" placeholder="username" />
                <Input icon="fas fa-key" type="password" placeholder="password" />
                <em>Forot Password</em>
                <Button to="/home" classes="btn-blueGradient btn-md">Log In</Button>
            </Form>
        );
    }


    registerForm = () => {
        return(
            <Form>
                <Input icon="fas fa-user" type="text" placeholder="username" />
                <Input icon="fas fa-key" type="text" placeholder="password" />
                <Input icon="fas fa-key" type="text" placeholder="password2" />
                <Input icon="fas fa-passport" type="text" placeholder="name" />
                <Input icon="fas fa-passport" type="text" placeholder="surname" />
                <Input icon="fas fa-at" type="text" placeholder="e-mail" />
                <Button classes="btn-blueGradient btn-md">Submit</Button>
            </Form>
        );
    }


    render(){
    return(
        <div className="FirstLayout">

            <Modal show={this.state.show} modalClose={this.hideModal}>
                {this.state.chooseForm ? this.loginFrom() : this.registerForm()}
            </Modal>

        
            <div className="SignContent">
                <h1>Skibidi</h1>
                <Button clicked={this.openLogIn} classes="btn-blueGradient btn-lg">Sign In</Button>
                <Button clicked={this.openRegister} classes="btn-orangeGradient btn-lg">Sign Up</Button>
                {this.props.children}
            </div>
        </div>
    );
}}

export default openingPageLayout;