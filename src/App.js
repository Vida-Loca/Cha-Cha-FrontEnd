import React from 'react';
import './globalStyles/App.scss';
import OpeningLayout from './layout/OpeningPageLayout';
import MainLayout from './layout/MainLayout';


class App extends React.Component {
  
  render(){
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
}}

export default App;
