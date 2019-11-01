import React from 'react';
import './globalStyles/App.scss';
import OpeningLayout from './layout/OpeningPageLayout';
import MainLayout from './layout/MainLayout';


class App extends React.Component {
  state = {
    isLoggedIn: true
  }
  
  render(){
  return (
      <div className="App">
        {!this.state.isLoggedIn ? <OpeningLayout />: <MainLayout />}
      </div>

  );
}}

export default App;
