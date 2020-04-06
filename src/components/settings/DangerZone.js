import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'

const options = ['Restart Server Now', 'Restart Server', 'Stop Server Now', 'Stop Server']

function DangerZone(props) {
  const [open, setOpen] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [action, setAction] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  const anchorRef = React.useRef(null)

  const {
    onRestartServerNow,
    onStopServerNow,
    onRestartServer,
    onStopServer,
    classes
  } = props

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClick = () => {
     setAction(options[selectedIndex].toUpperCase())
     setOpenDialog(true)
  }

  const handleMenuItemClick = (event, index) => {
     setSelectedIndex(index)
     setOpen(false)
   }

  const handleToggle = () => {
     setOpen(prevOpen => !prevOpen)
   }

  const handleClose = event => {
     if (anchorRef.current && anchorRef.current.contains(event.target)) {
       return
     }
     setOpen(false)
   }

  const redTheme = createMuiTheme({ palette: { error: { main: '#fafafa' } } })

  const isConfirmed = () => action === confirm

  const execAction = () => {
    // const options = ['Restart Server Now', 'Restart Server', 'Stop Server Now', 'Stop Server']
    // console.log('selectedIndex: ' + selectedIndex)
    /*onRestartServerNow,
    onStopServerNow,
    onRestartServer,
    onStopServer,*/
    switch(selectedIndex) {
      case 0:
        onRestartServerNow()
        break;
      case 1:
        onRestartServer()
        break;
      case 2:
        onStopServerNow()
        break;
      case 3:
        onStopServer()
        break;
    }
    setOpenDialog(false)
  }

  return (
    <div>
      <Typography className={classes.secondaryHeading}>
      Before restarting or stopping the server be sure to check your <br/>
      configurations. If you chose an action with "NOW" it will drop all <br/>
      active calls and inmediatly restart or stop the server.
      </Typography>
      <br />
      <MuiThemeProvider theme={redTheme}>
        <ButtonGroup
          variant="outlined" color="secondary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="secondary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      </MuiThemeProvider>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.secondaryHeading}>
            Last chance. A signal will be send to your Router instance and the UI will be temporarily unresponsive.
            Some changes can render your server inoperable. Proceed with caution!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={e => setConfirm(e.target.value)}
            label={`Please type ${action} to continue`}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button disabled={!isConfirmed()} onClick={execAction} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(DangerZone)
