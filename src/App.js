import React, { Component } from 'react';
import { NavigationDrawer, Button, FontIcon } from 'react-md';
import logo from './logo.svg';
import './App.css';
import MapContainer from './containers/MapContainer'
class App extends Component {
  render() {
    return (
      <NavigationDrawer
        drawerTitle="google maps"
        toolbarTitle="google maps"
      >
        <div className="App">
          <MapContainer></MapContainer>
          {/* <Button raised primary iconEl={<FontIcon>home</FontIcon>}>Button</Button> */}
        </div>
      </NavigationDrawer>
    );
  }
}

export default App;
