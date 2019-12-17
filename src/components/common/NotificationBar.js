import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

class NotificationBar extends React.Component {

  render() {
    const { message, open, handleClose} = this.props

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={ open }
          autoHideDuration={4000}
          onClose={e => handleClose(e)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <Button key="undo" disabled color="secondary" size="small" onClick={ e => handleClose(e) }>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={ e => handleClose(e)}
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

export default NotificationBar
