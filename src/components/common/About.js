import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { observer, inject } from 'mobx-react'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
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

class About extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          onClose={ this.props.appStore.setAboutDialogOpen }
          open={ this.props.appStore.isAboutDialogOpen() }
        >
          <DialogTitle id="customized-dialog-title" onClose={ this.props.appStore.setAboutDialogOpen }>
            About
          </DialogTitle>
          <DialogContent>
          <CardContent>
            <Typography color="textSecondary">
              v1.0
            </Typography>
            <Typography component="p">
              Routr is a lightweight sip proxy, location server, and registrar that provides a reliable and scalable SIP infrastructure for telephony carriers, communication service providers, and integrators.
              This is the version "1.0" of Routr console. <br />
              {'"Next-generation SIP Server"'}
            </Typography>
          </CardContent>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(About))))
