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

  constructor(props) {
      super(props)
      this.state = {
          data: [],
          aboutDialogOpen: false,
          section: 'domains',
          notificationBarOpen: false,
          notificationBarMessage: '',
          apiUrl: "https://localhost:4567/api/v1draft1",
          token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.75_0_jp8__mLr2FK5Q-m2ph4euWA_zl3G_q01SdCo0Drg-_Dya3_OLTRGbRImnG5P-TfAgboqf5y3qGu1l39BA"
      }
  }

  componentWillMount() {
      setTimeout(function() {
          const section = this.state.section === 'numbers'? 'dids' : this.state.section
          fetch(this.state.apiUrl + '/' + section + '?filter=*&token=' + this.state.token)
          .then(results => {
              return results.json();
          }).then(resources => {
              const data = []
              if (resources && resources.result) {
                resources.result.forEach(item => {
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
          fetch(this.state.apiUrl + '/' + section + '/'+ ref + '?token=' + this.state.token, {
              method: 'DELETE'
          })
          .then(results => {
              return results.json()
          })
          .then(response => {
              this.componentWillMount()
              this.setState({ notificationBarOpen: true, notificationBarMessage: response.message })
          });
      })
  }

  handleChangeSection = (e, section) => {
      this.setState({section})
      this.componentWillMount()
  }

  handleNotify = (message) => {
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
              endpoint = {this.state.apiUrl + '/' + (this.state.section === 'numbers'? 'dids' : this.state.section) + '?token=' + this.state.token}
              handleDeleteItems={ (e, selected) => this.handleDeleteItems(e, selected) }
              handleNotify={this.handleNotify}
              columnData={getColumnData(this.state.section)} data={this.state.data} resource={this.state.section} /> }

          { !this.isResourceSection() && <PaginationTable
            handleRefresh={ e => this.componentWillMount() }
            name={this.state.section}
            columnData={getColumnData(this.state.section)}
            data={this.state.data} /> }

          <NotificationBar
              message={ this.state.notificationBarMessage }
              open={ this.state.notificationBarOpen}
              handleClose = { e => this.setState({ notificationBarOpen: false })} />
          <About handleClose={ e => this.setState({aboutDialogOpen:false})}
              endpoint={this.state.apiUrl + '/system/info?token=' + this.state.token}
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
