import React, { Component } from 'react';
import './App.css';
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import MenuAppBar from './MainNav';
import ClippedDrawer from './ClippedDrawer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#444444',
    },
    secondary: {
      light: '#00c853',
      main: '#444444',
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
              <ClippedDrawer />
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
