import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Paper from '@material-ui/core/Paper'
import { ipv4 } from 'ip-address-utils'
import { observer, inject } from 'mobx-react'

const styles = theme => ({
  formControl: {
     marginBottom: 12,
     width: 320
  },
  textField: {
     marginBottom: 10,
     width: 320
  },
  root: {
     width: '100%',
  },
  heading: {
     fontSize: theme.typography.pxToRem(15),
     flexBasis: '33.33%',
     flexShrink: 0,
  },
  secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
  },
  icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
  },
  details: {
      alignItems: 'flex-start',
  },
  column: {
      flexBasis: '33.33%',
  },
  helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
  },
})

class Settings extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            bindAddr: '',
            externAddr: '',
            localnets: '',
            dsProvider: 'files_data_source',
            dsParameters: '',
            registrarIntf: 'Internal',
            recordRoute: false,
            aclDeny: '',
            aclAllow: ''
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.config.spec.bindAddr) {
          let dsProvider = ''
          let dsParameters = ''
          let aclDeny = ''
          let aclAllow = ''
          if (nextProps.config.spec.dataSource) {
              dsProvider = nextProps.config.spec.dataSource.provider
              dsParameters = nextProps.config.spec.dataSource.parameters
          }
          if (nextProps.config.spec.accessControlList) {
              aclDeny = nextProps.config.spec.accessControlList.deny.join('\n')
              aclAllow = nextProps.config.spec.accessControlList.allow.join('\n')
          }

          this.setState({
              bindAddr: nextProps.config.spec.bindAddr,
              externAddr: nextProps.config.spec.externAddr,
              localnets: nextProps.config.spec.localnets,
              registrarIntf: nextProps.config.spec.registrarIntf,
              recordRoute: nextProps.config.spec.recordRoute,
              dsParameters,
              dsProvider,
              aclDeny,
              aclAllow
          })
        }
    }

    hasValue = field => field || field.length > 0

    isValidSubnets = s => {
        if (!this.hasValue(s)) return true
        const subnets = s.toString().split('\n')
        return subnets.filter(subnet => ipv4.isSubnet(subnet)).length
          === subnets.length
    }

    isValidDSParameter = dsParameter => {
        if (!this.hasValue(dsParameter)) return true
        const parameters = dsParameter.split(',')
        return parameters.filter(parameter =>
          parameter.split('=').length === 1 ||
          parameter.split('=')[1].length === 0 ||
          !isNaN(parameter.split('=')[0])).length === 0
    }

    handleChange = (event, p) => {
        const id = event.currentTarget.id
        const value = event.target.value
        if(id === 'bindAddr') this.setState({bindAddr: value})
        if(id === 'externAddr') this.setState({externAddr: value})
        if(id === 'localnets') this.setState({localnets: value})
        if(id === 'dsProvider') this.setState({dsProvider: value})
        if(id === 'dsParameters') this.setState({dsParameters: value})
        if(id === 'registrarIntf') this.setState({registrarIntf: value})
        if(id === 'aclDeny') this.setState({aclDeny: value})
        if(id === 'aclAllow') this.setState({aclAllow: value})
        if(id === 'recordRoute') this.setState({recordRoute: event.target.checked})
    }

    handleSave() {
        // Convert back to correct format
        // save
        // Notify
    }

    render(props) {
      const { classes } = this.props

      return (
        <div className={classes.root}>
          {/*<div style={{marginBottom: 20}}>
            <Typography variant="caption" style={{marginTop: 20}}>
              Changes to this configuration will be apply after the next restart.
              <br />
              <a href="#sub-labels-and-columns" className={classes.link} >
                Learn more
              </a>
            </Typography>
          </div>*/}
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>General Settings</Typography>
                <Typography className={classes.secondaryHeading}> Network, Routing, Data Access</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="dataSource.provider">
                          Data Source Provider
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          value={this.state.dsProvider}
                          onChange={this.handleChange}
                          labelWidth={155}
                        >
                          <MenuItem id='dsProvider' value="file_data_provider">
                            <em>Files Data Source</em>
                          </MenuItem>
                          <MenuItem id='dsProvider' value="redis_data_provider">Redis Data Provider</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                      id="dsParameters"
                      label="Data Source Parameters"
                      value={this.state.dsParameters}
                      onChange={this.handleChange}
                      className={classes.textField}
                      error={!this.isValidDSParameter(this.state.dsParameters)}
                      variant="outlined"
                    />
                    <TextField
                      id="bindAddr"
                      label="Bind Address"
                      value={this.state.bindAddr}
                      onChange={this.handleChange}
                      className={classes.textField}
                      error={
                        this.hasValue(this.state.bindAddr)  &&
                        !ipv4.isValid(this.state.bindAddr)
                      }
                      variant="outlined"
                    />
                    <TextField
                      id="externAddr"
                      label="External Address"
                      value={this.state.externAddr}
                      onChange={this.handleChange}
                      className={classes.textField}
                      error={
                        this.hasValue(this.state.externAddr) &&
                        !ipv4.isValid(this.state.externAddr)
                      }
                      variant="outlined"
                    />
                    <TextField
                      id="localnets"
                      label="Localnets"
                      multiline
                      rowsMax="4"
                      value={this.state.localnets}
                      onChange={this.handleChange}
                      error={ !this.isValidSubnets(this.state.localnets)}
                      className={classes.textField}
                      variant="outlined"
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="dataSource.provider">
                          Registration Interface
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          value={this.state.registrarIntf}
                          onChange={this.handleChange}
                          labelWidth={155}
                        >
                          <MenuItem id='registrarIntf' value="Internal">
                            <em>Internal</em>
                          </MenuItem>
                          <MenuItem id='registrarIntf' value="External">
                              External
                          </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                      id="aclDeny"
                      label="Access Control List / Deny"
                      multiline
                      rowsMax="4"
                      onChange={this.handleChange}
                      value={this.state.aclDeny}
                      error={ !this.isValidSubnets(this.state.aclDeny)}
                      variant="outlined"
                      className={classes.textField}
                    />
                    <TextField
                      id="aclAllow"
                      label="Access Control List / Allow"
                      multiline
                      rowsMax="4"
                      onChange={this.handleChange}
                      error={ !this.isValidSubnets(this.state.aclAllow)}
                      value={this.state.aclAllow}
                      className={classes.textField}
                      variant="outlined"
                    />
                </div>
                <div className={classes.column, classes.helper}>
                <FormControlLabel
                  control={
                    <Switch
                      id="recordRoute"
                      color="primary"
                      onChange={this.handleChange}
                      checked={this.state.recordRoute}
                    />
                  }
                  label="Record-Route"
                />
                <br />
                <Typography variant="caption">
                  Check if you want server to stay within the signaling path
                  <br />
                  <a href="#sub-labels-and-columns" className={classes.link}>
                    Learn more
                  </a>
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" color="primary">
                Save
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>Advanced Settings</Typography>
              <Typography className={classes.secondaryHeading}>Resful API, Certificates, More</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    }
}


Settings.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(Settings))))
