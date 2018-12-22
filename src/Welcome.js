import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    backgroundImage: 'linear-gradient(#33383d, #222)',
    overflow: 'hidden',
    height: '100vh',
  },
  card: {
    backgroundColor: '#33383d',
    maxWidth: 300,
    position: 'absolute',
    left: 'calc(50vw - 150px)',
    top: 'calc(50vh - 120px)'
  },
  button: {
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#6fbf73',
    }
  }
})

class WelcomePage extends React.Component {

  render () {
    const { classes } = this.props

    return(
      <div className={classes.root}>
        <Card className={classes.card} >
          <CardContent>
            <img height={40} src="/images/logo.png" />
            <br />
            <br />
            <Typography variant="caption" style={{color: '#fff'}}>
            v1.0
            </Typography>
            <br />
            <Typography variant="body1" style={{color: '#fff'}} gutterBottom>
            Welcome to Routr Console demo. The data contain in this demo gets cleanup periodically, so please ensure to save your configuration files. If you like what you see, please considere sharing with friends and co-workers. Thanks for your interest in this project.
            </Typography>
          </CardContent>
          <CardActions>
            <div style={{width: '100%', display: 'flex'}}>
              <span style={{flex: 1}}></span>
              <Button className={classes.button} size="small" href="/?apiURL=https://api.routr.io/api/v1beta1&token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.75_0_jp8__mLr2FK5Q-m2ph4euWA_zl3G_q01SdCo0Drg-_Dya3_OLTRGbRImnG5P-TfAgboqf5y3qGu1l39BA">Continue</Button>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(WelcomePage)
