import React, { Component } from 'react'
import './App.css'
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import ClippedDrawer from './ClippedDrawer'
import Welcome from './Welcome'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
      primary: {
        light: '#757ce8',
        main: '#444444',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        main: '#3F51B5',
      },
    },
})

class App extends Component {

  displayWelcome = () => window.location.pathname === '/login'

  render() {
    return (
      <div className="App">
          {
            this.displayWelcome() && <Welcome />
          }
          {
            !this.displayWelcome() &&
            <MuiThemeProvider theme={theme}>
                <ClippedDrawer />
            </MuiThemeProvider>
          }
      </div>
    )
  }
}

export default App
