import React, { Component } from 'react'
import './App.css'
import '../node_modules/dropzone/dist/min/dropzone.min.css'
import ClippedDrawer from './ClippedDrawer'
import Snackbar from '@material-ui/core/Snackbar'
import LostConnectionDialog from './components/common/LostConnectionDialog'
import InputToken from './components/common/InputToken'
import Button from '@material-ui/core/Button'
import ClearCache from "react-clear-cache"
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

  constructor(props) {
      super(props)
      this.state = {
        url: 'https://google.com',
        snackOpen: true
      }
  }

  componentDidMount() {
      // This is only working on dev mode :(
      if(getParameterByName('token')) {
        this.props.apiStore.setToken(getParameterByName('token'))
      }
      if(getParameterByName('apiUrl')) {
        this.props.apiStore.setApiURL(getParameterByName('apiUrl'))
      }
      this.setState({ url: this.props.apiStore.getPingEndpoint() })
  }

  handleCloseUpdateSnack =() => {
    this.setState({snackOpen: false})
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
              <ClearCache>
              {({ isLatestVersion, emptyCacheStorage }) => (
                <div>
                  {!isLatestVersion && (
                    <Snackbar
                      open={this.state.snackOpen}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      autoHideDuration={15000}
                      onClose={this.handleCloseUpdateSnack}
                      message="A new version of the web console is available"
                      action={[
                        <Button
                          key="update"
                          aria-label="Update console"
                          size="small"
                          variant="contained"
                          onClick={e => {
                             e.preventDefault();
                             emptyCacheStorage();
                          }}
                        >
                          Update now
                        </Button>,
                      ]}
                    />            
                  )}
                </div>
              )}
            </ClearCache>

          </MuiThemeProvider>
      </div>
    )
  }
}

export default inject('apiStore')(inject('appStore')(observer(App)))
