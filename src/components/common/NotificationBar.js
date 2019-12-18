import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { observer, inject } from 'mobx-react'

class NotificationBar extends React.Component {

  handleClose = () => this.props.appStore.setNotificationOpen()

  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ this.props.appStore.isNotificationOpen() }
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.appStore.notificationMsg}</span>}
          action={[
            <Button key="undo" disabled color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('appStore')(observer(NotificationBar))
