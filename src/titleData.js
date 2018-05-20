// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import DomainsIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings';
import GatewaysIcon from '@material-ui/icons/SwapHoriz';
import AgentsIcon from '@material-ui/icons/People';
import PeersAgent from '@material-ui/icons/GroupWork';
import LocationSearching from '@material-ui/icons/LocationSearching';
import DoneIcon from '@material-ui/icons/Done';
import LogsIcon from '@material-ui/icons/Assignment';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DomainsIcon />
      </ListItemIcon>
      <ListItemText primary="Domains" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AgentsIcon />
      </ListItemIcon>
      <ListItemText primary="Agents" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GatewaysIcon />
      </ListItemIcon>
      <ListItemText primary="Gateways" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeersAgent />
      </ListItemIcon>
      <ListItemText primary="Peers" />
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
  </div>
);

export const otherMailFolderListItems = (
  <div>
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
