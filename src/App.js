import React, { Component } from 'react';
import './App.css';
import MapContainer from './containers/MapContainer'
import FlashMessages from './containers/FlashMessage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlashMessages />
        <MapContainer></MapContainer>
      </div>
    );
  }
}

export default App;
