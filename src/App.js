import React, { Component } from 'react'
import './App.css'
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import ClippedDrawer from './ClippedDrawer'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { getParameterByName } from './components/common/utils'
import { observer, inject } from 'mobx-react'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
      primary: {
        light: '#757ce8',
        main: '#33383d',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        main: '#3F51B5',
      },
    },
})

class App extends Component {

  componentDidMount() {
      // This is only working on dev mode :(
      if(getParameterByName('token')) {
          this.props.apiStore.setToken(getParameterByName('token'))
      }
      // This variable name is misleading. Consider refactoring.
      if(getParameterByName('apiURL')) {
          this.props.apiStore.setApiURL(getParameterByName('apiURL'))
      }
      if(getParameterByName('apiHost')) {
          this.props.apiStore.setApiHost(getParameterByName('apiHost'))
      }
  }

  render() {
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
              <ClippedDrawer />
          </MuiThemeProvider>
      </div>
    )
  }
}

export default inject('apiStore')(observer(App))
