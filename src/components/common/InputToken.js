import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import { observer, inject } from 'mobx-react'

class InputToken extends Component {
  state = {
    token: '',
    badToken: false
  }

  render() {
    const handleClickGo = async (e) => {
      e.preventDefault()
      this.props.apiStore.setToken(this.state.token)
      await this.props.apiStore.loadConfig()
      if(!this.props.apiStore.isAuthorized())
        this.setState({token: '', badToken: true})
    }

    const handleChange = e => {
        const id = e.currentTarget.id
        const value = e.target.value
        if (id === 'token') this.setState({token: value, badToken: false })
    }

    return (<Dialog
        open={true} aria-labelledby="form-dialog-title">
        <form onSubmit={handleClickGo}>
        <DialogTitle
          style={{ backgroundColor: '#33383d' }}
          id="form-dialog-title">
          <img src="/images/logo.png" className="App-logo" alt="logo" />
        </DialogTitle>
        <DialogContent>

          <DialogContentText>
          To access the web console, please enter the access token. Refer to
          <Button href="https://routr.io/docs/api/token/" color="primary">
          authentication
          </Button> to obtain a token

          </DialogContentText>
          { this.state.badToken && <p style={{color: '#33383d'}}>Bad token!</p> }
          <TextField
            onChange={handleChange}
            value={this.state.token}
            autoFocus
            margin="dense"
            id="token"
            label="Enter Token"
            type="text"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button style={{ marginRight: 15 }} type="submit" onClick={handleClickGo} color="primary">
            Sign in
          </Button>
        </DialogActions>
        </form>
      </Dialog>)
  }
}

export default inject('apiStore')(observer(InputToken))
