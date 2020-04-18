import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

class LostConnectionDialog extends Component {
  render() {
    return (<Dialog
        fullScreen
        style={{ backgroundColor: '#33383d' }}
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ backgroundColor: '#33383d', color: '#fff' }}
          id="alert-dialog-title">
          <img src="/images/logo.png" className="App-logo" alt="logo" />
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#fff'}}>
          <Typography id="tableTitle" style={{ color: '#33383d' }}>
            Console cannot connect to running routr engine. Re-trying ...
          </Typography>
        </DialogContent>
      </Dialog>)
  }
}

export default LostConnectionDialog
