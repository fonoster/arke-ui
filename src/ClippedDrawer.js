import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import MainNav from './MainNav'
import MenuNav from './MenuNav'
import Resources from './components/resources/Resources.js'
import Settings from './components/settings/Settings.js'
import NotificationBar from './components/common/NotificationBar'
import PaginationTable from './components/common/PaginationTable'
import About from './components/common/About'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import { toTitleCase } from './components/common/utils'
import { getColumnData } from './components/common/dataStruct'

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
    width: 240,
  },
  content: {
    overflow: 'scroll',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})

class ClippedDrawer extends React.Component {
  render () {
    const { classes, appStore, apiStore} = this.props
    const getTitle = () => toTitleCase(appStore.getCurrentSection())
    const columnData = getColumnData(appStore.getCurrentSection())
    const data = apiStore.getResources()

    return(
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <MainNav />
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <MenuNav />
        </Drawer>
        <main className={classes.content}
          style={{backgroundColor: appStore.getCurrentSection() === 'settings' ? '#fff' : ''}}>
          <div className={classes.toolbar}/>
          {
            appStore.isResourceSection() && <Resources/>
          }
          {
            appStore.isLocOrRegSection() &&
            <PaginationTable
                name={ getTitle() }
                columnData= { columnData }
                data={ data }
            />
          }
          {
            appStore.isSettingsSection() && <Settings/>
          }
          <NotificationBar />
          <About />
        </main>
      </div>
    )
  }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(ClippedDrawer))))
