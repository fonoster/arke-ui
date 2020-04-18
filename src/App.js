import React, { Component } from 'react'
import './App.css'
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import ClippedDrawer from './ClippedDrawer'
import LostConnectionDialog from './components/common/LostConnectionDialog'
import InputToken from './components/common/InputToken'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Online, Offline } from "react-detect-offline"
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

  state = {
    url: 'https://google.com'
  }

  componentDidMount() {
      // This is only working on dev mode :(
      if(getParameterByName('token')) {
        this.props.apiStore.setToken(getParameterByName('token'))
      }
      if(getParameterByName('apiHost')) {
        this.props.apiStore.setApiHost(getParameterByName('apiHost'))
      }
      this.setState({ url: this.props.apiStore.getPingEndpoint() })
  }

  render() {
    const polling = {
      enabled: true,
      url: this.state.url,
      interval: 2000,
      timeout: 2000
    }
    return (
      <div className="App">
          <MuiThemeProvider theme={theme}>
              <Online polling={polling}>
                {
                  this.props.apiStore.isReady() &&
                  this.props.apiStore.isAuthorized() &&
                  <ClippedDrawer />
                }
                {
                  this.props.apiStore.isReady() &&
                  !this.props.apiStore.isAuthorized() &&
                  <div style={{
                    backgroundColor: '#fafafa',
                    height: '100vh',
                    width: '100vw'}}>
                  <InputToken />
                  </div>
                }
              </Online>
              <Offline polling={polling}>
                <div style={{width: '100vw', height: '100vh', backgroundColor: '#33383d'}}>
                  <LostConnectionDialog />
                </div>
              </Offline>
          </MuiThemeProvider>
      </div>
    )
  }
}

export default inject('apiStore')(inject('appStore')(observer(App)))
