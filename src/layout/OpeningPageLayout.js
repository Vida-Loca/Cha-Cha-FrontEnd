import React, { Component } from "react";
import Button from "../components/button/Button";
import Modal from "../components/Modal/Modal";
import TextInput from "../components/Inputs/TextInput/TextInput";
import Form from "../components/Form/Form";

class OpeningPageLayout extends Component {
  state = { chooseForm: false, show: false };

  hideModal = () => {
    this.setState({ show: false });
  };
  showModal = () => {
    this.setState({ show: true });
  };

  openLogIn = () => {
    this.showModal();
    this.setState({ chooseForm: true });
  };

  openRegister = () => {
    this.showModal();
    this.setState({ chooseForm: false });
  };

  loginFrom = () => {
    return (
      <Form>
        <TextInput placeholder="username" name="username" />
        <TextInput placeholder="password" name="password" />
        <em>Forot Password</em>
        <Button to="/home" classes="btn-blueGradient btn-md">
          Log In
        </Button>
      </Form>
    );
  };

  registerForm = () => {
    return (
      <Form>
        <TextInput placeholder="username" name="username" />
        <TextInput placeholder="password" name="password" />
        <TextInput placeholder="repeat password" name="password2" />
        <TextInput placeholder="name" name="name" />
        <TextInput placeholder="surname" name="surname" />
        <TextInput placeholder="e-mail" name="email" />
        <Button classes="btn-blueGradient btn-md">Submit</Button>
      </Form>
    );
  };

  render() {
    return (
      <div className="FirstLayout">
        <Modal show={this.state.show} modalClose={this.hideModal}>
          {this.state.chooseForm ? this.loginFrom() : this.registerForm()}
        </Modal>

        <div className="SignContent">
          <h1>Skibidi</h1>
          <Button clicked={this.openLogIn} classes="btn-blueGradient btn-lg">
            Sign In
          </Button>
          <Button
            clicked={this.openRegister}
            classes="btn-orangeGradient btn-lg"
          >
            Sign Up
          </Button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default OpeningPageLayout;
