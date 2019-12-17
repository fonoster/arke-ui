import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import DropzoneComponent from 'react-dropzone-component'
import { withStyles } from '@material-ui/core/styles'
import { observer, inject } from 'mobx-react'
import { getEndpoint } from '../common/utils'

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    }
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class FileUploader extends React.Component {
  render() {
    const { classes } = this.props
    const eventHandlers = { success: () => {
        this.props.apiStore.loadResources()
        this.props.appStore.setFileUploaderOpen()
    }}
    const djsConfig = { addRemoveLinks: true }
    const endpoint = getEndpoint(
        this.props.apiStore.getAPIUrl(),
        this.props.appStore.getCurrentSection(),
        '',
        this.props.apiStore.getToken()
    )
    const componentConfig = {
        iconFiletypes: ['.yaml', '.yml'],
        showFiletypeIcon: true,
        postUrl: endpoint
    }

    return (
      <div>
        <Dialog
          open={ this.props.appStore.isFileUploaderOpen() }
          onClose={ this.props.appStore.setFileUploaderOpen }
          TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={ this.props.appStore.setFileUploaderOpen }>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Resource Input
              </Typography>
            </Toolbar>
          </AppBar>
          <DropzoneComponent eventHandlers={eventHandlers} djsConfig={djsConfig} config={componentConfig} />
        </Dialog>
      </div>
    )
  }
}

FileUploader.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(FileUploader))))
