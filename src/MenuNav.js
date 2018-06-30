import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DomainsIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings';
import GatewaysIcon from '@material-ui/icons/SwapHoriz';
import AgentsIcon from '@material-ui/icons/People';
import PhoneIcon from '@material-ui/icons/Phone';
import PeersAgent from '@material-ui/icons/GroupWork';
import LocationSearching from '@material-ui/icons/LocationSearching';
import DoneIcon from '@material-ui/icons/Done';
import LogsIcon from '@material-ui/icons/Assignment';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function MenuNav(props) {
  const { classes, handleChangeResource } = props;
  return (
    <div className={classes.root}>
      <ListItem button onClick={e => handleChangeResource(e, 'domains')}>
        <ListItemIcon>
          <DomainsIcon/>
        </ListItemIcon>
        <ListItemText primary="Domains"/>
      </ListItem>
      <ListItem button onClick={e => handleChangeResource(e, 'agents')}>
        <ListItemIcon>
          <AgentsIcon />
        </ListItemIcon>
        <ListItemText primary="Agents" />
      </ListItem>
      <ListItem button onClick={e => handleChangeResource(e, 'peers')}>
        <ListItemIcon>
          <PeersAgent />
        </ListItemIcon>
        <ListItemText primary="Peers" />
      </ListItem>
      <ListItem button onClick={e => handleChangeResource(e, 'gateways')}>
        <ListItemIcon>
          <GatewaysIcon />
        </ListItemIcon>
        <ListItemText primary="Gateways" />
      </ListItem>
      <ListItem button onClick={e => handleChangeResource(e, 'numbers')}>
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Numbers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LocationSearching />
        </ListItemIcon>
        <ListItemText primary="Location" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DoneIcon />
        </ListItemIcon>
        <ListItemText primary="Registration" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <LogsIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
    </div>
  );
}

MenuNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuNav);
