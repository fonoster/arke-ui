import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class About extends React.Component {

  render() {
    const { classes } = this.props
    return (
      <div>
        <Dialog
          open={ this.props.appStore.isAboutDialogOpen() }
          onClose={ this.props.appStore.setAboutDialogOpen }
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={ this.props.appStore.setAboutDialogOpen }>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                About
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                v1.0
              </Typography>
              <Typography component="h2">
                Routr Console
              </Typography>
              <Typography component="p">
                Routr is a lightweight sip proxy, location server, and registrar that provides a reliable and scalable SIP infrastructure for telephony carriers, communication service providers, and integrators.
                This is the version "1.0" of Routr console. <br />
                {'"Next-generation SIP Server"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="https://routr.io">Learn More</Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('appStore')(withStyles(styles)(observer(About)))
