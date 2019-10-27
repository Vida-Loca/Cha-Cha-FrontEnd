import React from 'react';
import Button from '../components/button/Button';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';

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
                    <form action="">
                        <Input type="text" placeholder="username" />
                        <Input type="password" placeholder="password" />
                        <Button classes="btn-blueGradient btn-sm">Submit</Button>
                    </form>
                );
            } else {
                return(
                    <form action="">
                    <Input type="text" placeholder="username" />
                    <Input type="text" placeholder="password" />
                    <Input type="text" placeholder="password2" />
                    <Input type="text" placeholder="name" />
                    <Input type="text" placeholder="surname" />
                    <Input type="text" placeholder="e-mail" />
                    <Button classes="btn-blueGradient btn-sm">Submit</Button>
                </form>
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

            <h1>Skibidi</h1>
            <Button clicked={this.openLogIn} classes="btn-blueGradient btn-md">Sign In</Button>
            <Button clicked={this.openRegister} classes="btn-blueGradient btn-md">Sign Up</Button>
            {this.props.children}
        </div>
    );
}}

export default openingPageLayout;