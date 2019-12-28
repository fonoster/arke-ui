import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import {
  isValidIp,
  isValidPort,
  isValidPath,
  isValidThreadNumber
} from '../common/utils'

function NetworkingAndTransport(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    const isValid = () => isValidIp(config.restBindAddr) &&
        isValidPort(config.restPort) &&
        isValidPath(config.restKeyStorePath) &&
        isValidPath(config.restTrustStorePath) &&
        isValidThreadNumber(config.restMinThreads) &&
        isValidThreadNumber(config.restMaxThreads) &&
        !isNaN(config.restTimeOutMillis)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
          This is the default IP address for the Rest service. <br /> All HTTP
          traffic will be routed through this interface.
        </Typography>
        <br />
        <TextField
          id="restBindAddr"
          label="Bind Address"
          value={config.restBindAddr}
          onChange={onChange}
          className={classes.textField}
          error={!isValidIp(config.restBindAddr)}
          variant="outlined"
          size="small"
          placeholder="0.0.0.0"
        />
        <br />
        <TextField
          id="restPort"
          label="HTTP Port"
          onChange={onChange}
          className={classes.textField}
          value={config.restPort}
          error={!isValidPort(config.restPort)}
          variant="outlined"
          size="small"
          placeholder="4567"
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          Minimum thread allocation. Defaults to 8.
        </Typography>
        <br />
        <TextField
          id="restMinThreads"
          label="Minimum Threads"
          onChange={onChange}
          className={classes.textField}
          value={config.restMinThreads}
          variant="outlined"
          size="small"
          error={!isValidThreadNumber(config.restMinThreads)}
          placeholder="8"
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          Maximum thread allocation. Defaults to 200.
        </Typography>
        <br />
        <TextField
          id="restMaxThreads"
          label="Maximum Threads"
          onChange={onChange}
          className={classes.textField}
          value={config.restMaxThreads}
          error={!isValidThreadNumber(config.restMaxThreads)}
          variant="outlined"
          size="small"
          placeholder="200"
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          Will reject requests that last more than the timeout. <br />
          Defaults to 5000(5 seconds.)
        </Typography>
        <br />
        <TextField
          id="restTimeOutMillis"
          label="Request Timeout"
          onChange={onChange}
          className={classes.textField}
          value={config.restTimeOutMillis}
          error={isNaN(config.restTimeOutMillis)}
          variant="outlined"
          size="small"
          placeholder="5000"
        />
        <br />
        <TextField
          id="restKeyStorePath"
          label="KeyStore Path"
          onChange={onChange}
          className={classes.textField}
          value={config.restKeyStorePath}
          variant="outlined"
          size="small"
          placeholder="/etc/certificates/api-cert.jks"
        />
        <br />
        <TextField
          id="restTrustStorePath"
          label="TrustStore Path"
          onChange={onChange}
          className={classes.textField}
          value={config.restTrustStorePath}
          variant="outlined"
          size="small"
          placeholder="/etc/certificates/api-cert.jks"
        />
        <br />
        <TextField
          id="restKeyStorePassword"
          label="KeyStore Password"
          onChange={onChange}
          className={classes.textField}
          value={config.restKeyStorePassword}
          variant="outlined"
          type="password"
          size="small"
        />
        <br />
        <TextField
          id="restTrustStorePassword"
          label="TrustStore Password"
          onChange={onChange}
          className={classes.textField}
          value={config.restTrustStorePassword}
          variant="outlined"
          type="password"
          size="small"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              id="restUnsecured"
              onChange={onChange}
              checked={config.restUnsecured}
              color="primary"
              size="small"
            />
          }
          label="Allow Unsecured"
        />
        <br />
        <Typography variant="caption">
          Check if you want to enable unsecured connections with<br />
          the APIs. Not recommended.
          <br />
          <a target="_blank" href="https://routr.io/docs/configuration/general/" className={classes.link2}>
            Learn more
          </a>
        </Typography>
        <br />
        <br />
        <div>
          <Button disabled={!isValid()} onClick={onSave} size="small"
            variant="contained" color="secondary"
            disableElevation>
           Save
          </Button>
          <Button onClick={onCancel} style={{marginLeft: 5}}
            size="small" variant="contained"
            disableElevation>
            Cancel
          </Button>
        </div>
      </div>
    )
}

export default withStyles(styles)(NetworkingAndTransport)
