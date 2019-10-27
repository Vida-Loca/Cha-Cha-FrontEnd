import React from 'react';
import './globalStyles/App.css';
import OpeningLayout from './layout/OpeningPageLayout';
import Button from './components/button/Button';
import Modal from './components/Modal/Modal';

class App extends React.Component {
  state = {
    purchasebale: false,
    show: false
  }

  hideModal = () => {
    this.setState({show: false});  
  }
  showModal = () => {
    this.setState({show: true});  
  }

  render(){
  return (
    <div className="App">
      <OpeningLayout>
        <Modal show={this.state.show} modalClose={this.hideModal} >
            <p>lox</p>
        </Modal>
        <h1>Skibidi</h1>
        <Button classes="btn-reverse-blueGradient btn-sm">Invite</Button>
        <Button classes="btn-blueGradient btn-md">Sign Up</Button>
        <Button clicked={this.showModal} classes="btn-orangeGradient btn-lg">Sign In</Button>
      </OpeningLayout>
    </div>
  );
}}

export default App;
