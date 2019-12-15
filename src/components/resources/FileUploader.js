import React from 'react';
//import 'brace/mode/ruby';
//import 'brace/theme/monokai';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
  render() {
    const { classes, open, endpoint, handleOnSuccess, handleClose } = this.props;
    const eventHandlers = { success: handleOnSuccess }
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
          onClose={ handleClose }
          TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" aria-label="Close" onClick={ handleClose }>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
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
