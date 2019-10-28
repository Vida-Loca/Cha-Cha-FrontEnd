import React from 'react';
import Button from '../components/button/Button';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';
import Form from '../components/Form/Form';

class openingPageLayout extends React.Component{
    state = {
        isLogin: false,
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
            this.setState({isLogin: true});
        }

        openRegister = () => {
            this.showModal();
            this.setState({isLogin: false});
        }

        returnForm = (isLog) =>{
            if(isLog){
                return(
                    <Form>
                        <Input type="text" placeholder="username" />
                        <Input type="password" placeholder="password" />
                        <Button classes="btn-blueGradient btn-md">Submit</Button>
                    </Form>
                );
            } else {
                return(
                    <Form>
                        <Input type="text" placeholder="username" />
                        <Input type="text" placeholder="password" />
                        <Input type="text" placeholder="password2" />
                        <Input type="text" placeholder="name" />
                        <Input type="text" placeholder="surname" />
                        <Input type="text" placeholder="e-mail" />
                        <Button classes="btn-blueGradient btn-md">Submit</Button>
                    </Form>
                );
            }
        }


    render(){
    return(
        <div className="FirstLayout">

            <Modal show={this.state.show} modalClose={this.hideModal}>

            {this.returnForm(this.state.isLogin)}

                
            </Modal>

            <div className="bg-curved"></div>
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