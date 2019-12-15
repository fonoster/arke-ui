import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MainNav from './MainNav'
import MenuNav from './MenuNav'
import Resources from './components/resources/Resources.js'
import NotificationBar from './components/common/NotificationBar'
import { getColumnData, createData} from './components/common/dataStruct'
import PaginationTable from './components/common/PaginationTable'
import About from './components/common/About'
import { getParameterByName } from './components/common/utils'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh'
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
    padding: theme.spacing(3),
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

class ClippedDrawer extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          data: [],
          aboutDialogOpen: false,
          section: 'domains',
          notificationBarOpen: false,
          notificationBarMessage: '',
          token: '',
          apiURL: '/api/v1beta1'
      }
  }

  getEndpoint = (apiURL, resource, filter, token) => {
      let endpoint = apiURL + '/' + resource

      if (filter) {
          endpoint = endpoint + '?filter=' + filter
      }

      if (token) {
          filter ? endpoint = endpoint + '&token=' + token : endpoint = endpoint + '?token=' + token
      }

      return endpoint
  }

  UNSAFE_componentWillMount() {
      if (getParameterByName('token')) {
          this.setState({token:getParameterByName('token')})
      }

      if (getParameterByName('apiURL')) {
          this.setState({apiURL:getParameterByName('apiURL')})
      }

      setTimeout(function() {
          const section = this.state.section

          fetch(this.getEndpoint(this.state.apiURL, section, '*', this.state.token))
          .then(results => {
              return results.json();
          }).then(resources => {
              const data = []
              if (resources && resources.data) {
                resources.data.forEach(item => {
                    data.push(createData(item, this.state.section))
                })
              }
              this.setState({ data })
          })
      }.bind(this), 1);  // wait for the state change
  }

  handleDeleteItems = (e, selected) => {
      selected.forEach(ref => {
          const section = this.state.section === 'numbers'? 'dids' : this.state.section

          fetch(this.getEndpoint(this.state.apiURL, section + '/'+ ref, '',this.state.token), {
              method: 'DELETE'
          })
          .then(results => {
              return results.json()
          })
          .then(response => {
              this.UNSAFE_componentWillMount()
              this.handleNotify(response.message)
          });
      })
  }

  handleChangeSection = (e, section) => {
      this.setState({section})
      this.UNSAFE_componentWillMount()
  }

  handleNotify = message => {
      this.setState({ notificationBarOpen: true, notificationBarMessage: message })
  }

  isResourceSection = () => {
      if (this.state.section === 'domains'  ||
          this.state.section === 'agents'   ||
          this.state.section === 'peers'    ||
          this.state.section === 'gateways'  ||
          this.state.section === 'numbers') {
            return true
      }
      return false
  }

  render () {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <MainNav onOpenAbout={ e => this.setState({aboutDialogOpen: true}) } />
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.toolbar} />
          <MenuNav handleChangeSection={ (e, res) => this.handleChangeSection(e, res)}/>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { this.isResourceSection() && <Resources
              endpoint = { this.getEndpoint(this.state.apiURL, this.state.section === 'numbers'? 'dids' : this.state.section, '',this.state.token) }
              handleDeleteItems={ (e, selected) => this.handleDeleteItems(e, selected) }
              handleNotify={this.handleNotify}
              handleChangeSection={this.handleChangeSection}
              columnData={getColumnData(this.state.section)} data={this.state.data} resource={this.state.section} /> }

          { !this.isResourceSection() && <PaginationTable
            handleRefresh={ e => this.UNSAFE_componentWillMount() }
            name={this.state.section}
            columnData={getColumnData(this.state.section)}
            data={this.state.data} /> }

          <NotificationBar
              message={ this.state.notificationBarMessage }
              open={ this.state.notificationBarOpen}
              handleClose = { e => this.setState({ notificationBarOpen: false })} />
          <About handleClose={ e => this.setState({aboutDialogOpen:false})}
              endpoint={ this.getEndpoint(this.state.apiURL, '/system/info', '', this.state.token) }
              open={this.state.aboutDialogOpen}></About>

        </main>
      </div>
    );
  }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
