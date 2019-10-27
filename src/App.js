import React from 'react';
import './globalStyles/App.css';
import OpeningLayout from './layout/OpeningPageLayout';


class App extends React.Component {
  
  render(){
  return (
    <div className="App">
      <OpeningLayout />
    </div>
  );
}}

export default App;
