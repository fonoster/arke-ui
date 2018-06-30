import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MainNav from './MainNav'
import MenuNav from './MenuNav'
import Resources from './components/resources/Resources.js'
import NotificationBar from './components/common/NotificationBar'
import { getColumnData, createData} from './components/resources/resourcesData'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});



class ClippedDrawer extends React.Component {

  constructor() {
      super()
      this.state = {
          data: [],
          resource: 'domains',
          notificationBarOpen: false,
          notificationBarMessage: '',
          apiUrl: "https://localhost:4567/api/v1draft1",
          token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.75_0_jp8__mLr2FK5Q-m2ph4euWA_zl3G_q01SdCo0Drg-_Dya3_OLTRGbRImnG5P-TfAgboqf5y3qGu1l39BA"
      }
  }

  componentWillMount() {
      setTimeout(function() {
          fetch(this.state.apiUrl + '/' + this.state.resource + '?filter=*&token=' + this.state.token)
          .then(results => {
              return results.json();
          }).then(resources => {
              const data = []
              if (resources && resources.result) {
                resources.result.forEach(item => {
                    data.push(createData(item, this.state.resource))
                })
              }
              this.setState({ data })
          })
      }.bind(this), 1);  // wait for the state change
  }

  handleDeleteItems = (e, selected) => {
      selected.forEach(ref => {
          fetch(this.state.apiUrl + '/' + this.state.resource + '/'+ ref + '?token=' + this.state.token, {
              method: 'DELETE'
          })
          .then(results => {
              return results.json()
          })
          .then(response => {
              console.log('res2: ' + JSON.stringify(response))
              this.componentWillMount()
              const notificationBarOpen = true
              const notificationBarMessage = response.message
              this.setState({ notificationBarOpen, notificationBarMessage })
          });
      })
  }

  handleChangeResource = (e, res) => {
      this.setState({resource: res})
      this.componentWillMount()
  }

  render () {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <MainNav />
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.toolbar} />
          <MenuNav handleChangeResource={ (e, res) => this.handleChangeResource(e, res)}/>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Resources
              endpoint = {this.state.apiUrl + '/' + this.state.resource + '?token=' + this.state.token}
              handleDeleteItems={ (e, selected) => this.handleDeleteItems(e, selected) }
              handleChangeResource={ (e, res) => this.handleChangeResource(e, res)}
              columnData={getColumnData(this.state.resource)} data={this.state.data} resource={this.state.resource} />
          <NotificationBar
              message={ this.state.notificationBarMessage }
              open={ this.state.notificationBarOpen}
              handleClose = { e => this.setState({ notificationBarOpen: false })} />
        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
