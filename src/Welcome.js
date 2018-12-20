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
    backgroundImage: 'linear-gradient(#444, #222)',
    overflow: 'hidden',
    height: '100vh',
  },
  card: {
    backgroundColor: '#444',
    minWidth: 400,
    maxWidth: 400,
    position: 'absolute',
    left: 'calc(50vw - 200px)',
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
            <img height={40} src="data:image/png;base64,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" />
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
