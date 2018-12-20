import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HelpIcon from '@material-ui/icons/HelpOutline'
import BugReportIcon from '@material-ui/icons/BugReport'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import GitHubButton from 'react-github-button'
import 'react-github-button/assets/style.css'
import logo from './logo.png'

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
    const { classes, onOpenAbout } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <img src={logo} className="App-logo" alt="logo" />
            <span className={classes.flex}/>
            {auth && (
              <div>
                <Button>
                  <GitHubButton style={{textTransform: 'capitalize'}} type="stargazers" namespace="fonoster" repo="routr" />
                </Button>
                <IconButton
                  color="inherit"
                  href="https://github.com/fonoster/routr/issues"
                >
                  <BugReportIcon />
                </IconButton>                
                <IconButton
                  color="inherit"
                  href="https://routr.io"
                >
                  <HelpIcon />
                </IconButton>
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
                  <MenuItem disabled onClick={this.handleClose}>Settings</MenuItem>
                  <MenuItem onClick={onOpenAbout}>About</MenuItem>
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

export default withStyles(styles)(MenuAppBar)
