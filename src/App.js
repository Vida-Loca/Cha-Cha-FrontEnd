import React from 'react';
import './globalStyles/App.scss';
import OpeningLayout from './layout/OpeningPageLayout';
import MainLayout from './layout/MainLayout';
import {FormProvider} from './context/FormContext';

class App extends React.Component {
  state = {
    isLoggedIn: true
  }
  
  render(){
  return (
      <FormProvider>
      <div className="App">
        {!this.state.isLoggedIn ? <OpeningLayout />: <MainLayout />}
      </div>
      </FormProvider>

  );
}}

export default App;
