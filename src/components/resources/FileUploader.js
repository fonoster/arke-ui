import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DropzoneComponent from 'react-dropzone-component'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
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

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 0
  },
}))(MuiDialogContent)

class FileUploader extends React.Component {
  state = {
    oldCnt: 0
  }

  render() {
    const { apiStore, appStore } = this.props

    const eventHandlers = { success: file => {
            apiStore.loadResources(appStore.getCurrentSection())
            appStore.setFileUploaderOpen()
            appStore.notify(`Resources added.`)
        },
        sending: () => this.setState({oldCnt: apiStore.resources.length}),
        error: e => {
            appStore.notify('An error occurred while adding resources.')
        }
    }
    const djsConfig = { addRemoveLinks: true }
    const endpoint = getEndpoint(
        apiStore.getEndpointBase(),
        appStore.getCurrentSection(),
        '',
        apiStore.getToken()
    )
    const componentConfig = {
        iconFiletypes: ['.yaml', '.yml'],
        showFiletypeIcon: true,
        postUrl: endpoint
    }

    return (
      <div>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={ this.props.appStore.isFileUploaderOpen() }
            onClose={ this.props.appStore.setFileUploaderOpen }
          >
            <DialogTitle id="customized-dialog-title" onClose={ this.props.appStore.setFileUploaderOpen }>
              Submit Resource File
            </DialogTitle>
            <DialogContent style={{padding: 10}}>
              <DropzoneComponent eventHandlers={eventHandlers} djsConfig={djsConfig} config={componentConfig} />
            </DialogContent>
          </Dialog>
      </div>
    )
  }
}

FileUploader.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(FileUploader))))
