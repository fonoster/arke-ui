import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
// then the mode, theme & extension
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-textmate'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import AnnouncementIcon from '@material-ui/icons/Announcement'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Y2J from 'json2yaml'
import J2Y from 'yamljs'
import Button from '@material-ui/core/Button'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import { observer, inject } from 'mobx-react'

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
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 0
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions)

class ResourceViewer extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          tab: 0
      }
  }

  UNSAFE_componentWillUpdate() {
      const resource = JSON.parse(this.props.appStore.getCurrentResource())
      if (!this.state.resource || this.state.resource.metadata.ref !== resource.metadata.ref){
          const resourceJson = JSON.stringify(resource, null, "\t")
          const resourceYaml = Y2J.stringify(resource)
          this.setState({resource, resourceJson, resourceYaml })
      }
  }

  handleTabsChange = (event, tab) => {
      this.setState({ tab })
      if (tab === 0) {
          this.setState({ resourceYaml: Y2J.stringify(JSON.parse(this.state.resourceJson)) })
      } else {
          const c = JSON.stringify(J2Y.parse(this.state.resourceYaml), null, "\t")
          this.setState({ resourceJson: c})
      }
  }

  handleChangeJson = newValue => {
      this.setState({ resourceJson: newValue })
      this.setState({ jsonEditorAnnotations: this.refs.jsonEditor.editor.getSession().getAnnotations() })
  }

  handleChangeYaml = newValue => {
      this.setState({ resourceYaml: newValue})
      this.setState({yamlEditorAnnotations: this.refs.yamlEditor.editor.getSession().getAnnotations()})
  }

  saveResource = () => {
      const resource = this.state.tab === 1
        ? this.state.resourceJson
        : JSON.stringify(J2Y.parse(this.state.resourceYaml))

      this.props.apiStore.update(resource)
      this.props.appStore.setResourceEditorOpen()
      //this.props.apiStore.loadResources(this.props.appStore.getCurrentSection())
  }

  render() {
    const { tab } = this.state

    return (
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={ this.props.appStore.isResourceEditorOpen() }
        >
          <DialogTitle id="customized-dialog-title" onClose={ this.props.appStore.setResourceEditorOpen }>
            Edit a resource
          </DialogTitle>
          <DialogContent>
            <Tabs onChange={this.handleTabsChange} value={tab}>
              <Tab label="YAML"/>
              <Tab label="JSON"/>
            </Tabs>
            {tab === 0 &&
              <AceEditor
                ref="yamlEditor"
                mode="yaml"
                theme="textmate"
                showGutter={ true }
                value={ this.state.resourceYaml }
                onChange={ this.handleChangeYaml }
                editorProps={{$blockScrolling: true}}
              />
            }
            {tab === 1 &&
              <AceEditor
                ref="jsonEditor"
                mode="json"
                theme="textmate"
                showGutter={ true }
                value={ this.state.resourceJson }
                onChange={ this.handleChangeJson }
                editorProps={{$blockScrolling: false}}
              />
            }
          <Grid container wrap="nowrap" spacing={16} style={{ backgroundColor: '#f2f2f2',
            paddingLeft: '10px', paddingTop: '10px'}}>
            <Grid item>
              <AnnouncementIcon />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography noWrap>This action is equivalent to: rctl apply -f spec.yaml</Typography>
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.saveResource}>
              Save
            </Button>
            <Button onClick={this.props.appStore.setResourceEditorOpen} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ResourceViewer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(ResourceViewer))))
