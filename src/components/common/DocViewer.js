import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/ruby';
import 'brace/theme/monokai';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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

class DocViewer extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, content, open, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={ open }
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close"
                onClick={ handleClose }>
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                { content? JSON.parse(content).metadata.name : ''}
              </Typography>
            </Toolbar>
          </AppBar>
          <AceEditor
            mode="ruby"
            theme="monokai"
            value={ content }
            readOnly={ true }
            editorProps={{$blockScrolling: true}}
          />
        </Dialog>
      </div>
    );
  }
}

DocViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocViewer);
