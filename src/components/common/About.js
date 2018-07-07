import React from 'react';
import 'brace/mode/ruby';
import 'brace/theme/monokai';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class About extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          endpoint: props.endpoint,
          serverVersion: '',
          apiVersion: '',
      }
  }

  componentWillMount() {
      fetch(this.state.endpoint)
      .then(results => {
          return results.json();
      }).then(response => {
          console.log(JSON.stringify(response))
          this.setState({serverVersion: response.version})
      })
  }

  render() {
    const { classes, open, handleClose} = this.props;
    return (
      <div>
        <Dialog
          open={ open }
          onClose={e => this.handleClose(e)}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={ handleClose }>
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                About
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                v1.0 alpha
              </Typography>
              <Typography variant="headline" component="h2">
                Arke Console
              </Typography>
              <Typography component="p">
                This version "alpha" of Arke console is not production ready <br />
                {'"Use this version at your own discretion"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="https://fonoster.github.com/arke">Learn More</Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
