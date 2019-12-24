import React from 'react'
import PropTypes from 'prop-types'
import LaunchIcon from '@material-ui/icons/Launch'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 300,
    position: 'relative',
    margin: '10% auto',
    padding: 8
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

function NoResourcesCard(props) {
  const { classes, resource } = props

  return (
    <div>
      <Card justify={'center'} className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            No resources found
          </Typography>
          <Typography component="h2">
              {resource}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            resource
          </Typography>
          <Typography component="p">
          At this time not resources found on the {resource.toLowerCase()} section. Go to the
          documentation to learn more about resources <a href="https://routr.io/docs/api-resources.html"><LaunchIcon style={{ color: '#3F51B5', fontSize: 18 }}></LaunchIcon></a>
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.button} variant="contained" onClick={props.appStore.setFileUploaderOpen }
            color="secondary" size="small">Add {resource}
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

NoResourcesCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default inject('appStore')(withStyles(styles)(observer(NoResourcesCard)))
