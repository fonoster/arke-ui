import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  githubButton: {
    bordeR: 0,
    color: 'red'
  }
}

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes, appStore } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <img src="/images/logo.png" className="App-logo" alt="logo" />
            <span className={classes.flex}/>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => {
                      appStore.setCurrentSection('settings')
                      this.handleClose()}
                  }>Settings</MenuItem>
                  <MenuItem onClick={() => {
                      appStore.setAboutDialogOpen()
                      this.handleClose()}
                  }>About</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('appStore')(withStyles(styles)(observer(MenuAppBar)))
