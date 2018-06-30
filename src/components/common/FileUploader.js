import React from 'react';
import ReactDOM from 'react-dom';
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
import DropzoneComponent from 'react-dropzone-component';

const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FileUploader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        open: false,
    };

    this.handleUploadDoc = this.handleUploadDoc.bind(this);
  }

  handleUploadDoc(e, endpoint) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch(endpoint, {
        method: 'POST',
        body: data
    }).then(response => {
        return response
    }).then(result => {
        this.setState({ open: false });
        console.log('What?')
    });
  };

  render() {
    const { classes, content, open, endpoint, handleClose } = this.props;
    const eventHandlers = { success: handleClose }
    const djsConfig = { addRemoveLinks: true };

    const componentConfig = {
        iconFiletypes: ['.yaml', '.yml'],
        showFiletypeIcon: true,
        postUrl: endpoint
    };

    return (
      <div>
        <Dialog
          open={ open }
          onClose={ e => handleClose(e) }
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={ handleClose }>
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Resource Input
              </Typography>
            </Toolbar>
          </AppBar>
          <DropzoneComponent eventHandlers={eventHandlers} djsConfig={djsConfig} config={componentConfig} />
        </Dialog>
      </div>
    );
  }
}

FileUploader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileUploader);
