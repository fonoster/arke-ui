import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-textmate";
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Y2J from 'json2yaml'
import J2Y from 'yamljs'
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
}

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 0
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class DocViewer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      open: false
    };
  }

  componentWillReceiveProps(nextProps){
      if (nextProps.content !== this.props.content) {
          const c = JSON.stringify(JSON.parse(nextProps.content), null, "\t")
          this.setState({ resourceJson: c })
          this.setState({ resourceYaml: Y2J.stringify(JSON.parse(nextProps.content)) })
      }

          this.setState({ open: nextProps.open })
  
  }

  handleTabsChange = (event, value) => {
    this.setState({ value });
    if (value === 0) {
        this.setState({ resourceYaml: Y2J.stringify(JSON.parse(this.state.resourceJson)) });
    }
    if (value === 1) {
        const c = JSON.stringify(J2Y.parse(this.state.resourceYaml), null, "\t")
        this.setState({ resourceJson: c});
    }
  };

  handleChangeJson = newValue => this.setState({ resourceJson: newValue})

  handleChangeYaml = newValue => this.setState({ resourceYaml: newValue})

  handleClose = () => this.setState({open: false})

  render() {
    const { value } = this.state;

    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={ this.state.open }
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Edit a resource
          </DialogTitle>
          <DialogContent>
            <Tabs onChange={this.handleTabsChange} value={value}>
              <Tab label="YAML"/>
              <Tab label="JSON"/>
            </Tabs>
            {value === 0 &&
              <AceEditor
                mode="json"
                theme="textmate"
                value={ this.state.resourceYaml }
                onChange={ this.handleChangeYaml }
                editorProps={{$blockScrolling: true}}
              />
            }
            {value === 1 &&
              <AceEditor
                mode="json"
                theme="textmate"
                value={ this.state.resourceJson }
                onChange={ this.handleChangeJson }
                editorProps={{$blockScrolling: false}}
              />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Update
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

DocViewer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DocViewer)
