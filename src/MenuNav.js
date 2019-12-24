import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DomainsIcon from '@material-ui/icons/Business'
import SettingsIcon from '@material-ui/icons/Settings'
import GatewaysIcon from '@material-ui/icons/SwapHoriz'
import AgentsIcon from '@material-ui/icons/People'
import DialpadIcon from '@material-ui/icons/Dialpad'
import PeersAgent from '@material-ui/icons/GroupWork'
import LocationSearching from '@material-ui/icons/LocationSearching'
import DoneIcon from '@material-ui/icons/Done'
import HelpIcon from '@material-ui/icons/HelpOutline'
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

class MenuNav extends React.Component {

    render() {
      const { classes, apiStore, appStore} = this.props
      const handleChangeSection = (e, section) => {
          if (appStore.isResourceSection() || appStore.isLocOrRegSection()) {
              apiStore.loadResources(section)
          } else if(appStore.isSettingsSection()) {
              apiStore.getConfig()
          }
          appStore.setCurrentSection(section)
      }

      return (
        <div className={classes.root}>
            <ListItem button onClick={e => handleChangeSection(e, 'domains')}>
              <ListItemIcon>
                <DomainsIcon/>
              </ListItemIcon>
              <ListItemText primary="Domains"/>
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'agents')}>
              <ListItemIcon>
                <AgentsIcon />
              </ListItemIcon>
              <ListItemText primary="Agents" />
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'peers')}>
              <ListItemIcon>
                <PeersAgent />
              </ListItemIcon>
              <ListItemText primary="Peers" />
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'gateways')}>
              <ListItemIcon>
                <GatewaysIcon />
              </ListItemIcon>
              <ListItemText primary="Gateways" />
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'numbers')}>
              <ListItemIcon>
                <DialpadIcon />
              </ListItemIcon>
              <ListItemText primary="Numbers" />
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'location')}>
              <ListItemIcon>
                <LocationSearching />
              </ListItemIcon>
              <ListItemText primary="Location" />
            </ListItem>
            <ListItem button onClick={e => handleChangeSection(e, 'registration')}>
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary="Registration" />
            </ListItem>
            <Divider />
            <ListItem button onClick={e => handleChangeSection(e, 'settings')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={e => window.open('https://github.com/fonoster/routr/issues', '_blank')}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItem >
        </div>)
    }
}

MenuNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(MenuNav))))
