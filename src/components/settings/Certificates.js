import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import {
  isValidPath
} from '../common/utils'


function NetworkingAndTransport(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    const isValid = () => isValidPath(config.scKeyStorePath) &&
        isValidPath(config.scTrustStorePath)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
          This configurations affect all your domains.
        </Typography>
        <br />
        <FormControl size="small" variant="outlined" className={classes.textField}>
            <InputLabel>
              Client Authentication Type
            </InputLabel>
            <Select
              value={config.scClientAuthType}
              onChange={onChange}
              labelWidth={200}
              size="small"
            >
              <MenuItem id='scClientAuthType' value="DisabledAll">
                <em>DisabledAll</em>
              </MenuItem>
              <MenuItem id='scClientAuthType' value="Disabled">
                  Disabled
              </MenuItem>
              <MenuItem id='scClientAuthType' value="Enabled">
                  Enabled
              </MenuItem>
              <MenuItem id='scClientAuthType' value="Want">
                  Want
              </MenuItem>
            </Select>
        </FormControl>
        <br />
        <FormControl size="small" variant="outlined" className={classes.textField}>
            <InputLabel>
              KeyStore Type
            </InputLabel>
            <Select
              value={config.scKeyStoreType}
              onChange={onChange}
              labelWidth={200}
              size="small"
            >
              <MenuItem id='scKeyStoreType' value="jks">
                <em>JKS</em>
              </MenuItem>
              <MenuItem id='scKeyStoreType' value="pkcs12">
                  PKCS12
              </MenuItem>
            </Select>
        </FormControl>
        <br />
        <TextField
          id="scKeyStorePath"
          label="KeyStore Path"
          onChange={onChange}
          className={classes.textField}
          value={config.scKeyStorePath}
          error={!isValidPath(config.scKeyStorePath)}
          variant="outlined"
          size="small"
          placeholder="/etc/certificates/domain-cert.jks"
        />
        <br />
        <TextField
          id="scTrustStorePath"
          label="TrustStore Path"
          onChange={onChange}
          className={classes.textField}
          value={config.scTrustStorePath}
          error={!isValidPath(config.scTrustStorePath)}
          variant="outlined"
          size="small"
          placeholder="/etc/certificates/domain-cert.jks"
        />
        <br />
        <TextField
          id="scKeyStorePassword"
          label="KeyStore Password"
          onChange={onChange}
          className={classes.textField}
          value={config.scKeyStorePassword}
          variant="outlined"
          type="password"
          size="small"
        />
        <br />
        <TextField
          id="scTrustStorePassword"
          label="TrustStore Password"
          onChange={onChange}
          className={classes.textField}
          value={config.scTrustStorePassword}
          variant="outlined"
          type="password"
          size="small"
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          TLS Support
        </Typography>
        <FormControlLabel
          style={{marginLeft: 10}}
          control={
            <Checkbox
              id="scSSLv3"
              onChange={onChange}
              checked={config.scSSLv3}
              color="primary"
              size="small"
            />
          }
          label="SSLv3"
        />
        <br />
        <FormControlLabel
          style={{marginLeft: 10}}
          control={
            <Checkbox
              id="scTLSv1"
              onChange={onChange}
              checked={config.scTLSv1}
              color="primary"
              size="small"
            />
          }
          label="TLSv1"
        />
        <br />
        <FormControlLabel
          style={{marginLeft: 10}}
          control={
            <Checkbox
              id="scTLSv11"
              onChange={onChange}
              checked={config.scTLSv11}
              color="primary"
              size="small"
            />
          }
          label="TLSv1.1"
        />
        <br />
        <FormControlLabel
          style={{marginLeft: 10}}
          control={
            <Checkbox
              id="scTLSv12"
              onChange={onChange}
              checked={config.scTLSv12}
              color="primary"
              size="small"
            />
          }
          label="TLSv1.2"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              id="scDebugging"
              onChange={onChange}
              checked={config.scDebugging}
              color="primary"
              size="small"
            />
          }
          label="Enable Debugging"
        />
        <br />
        <Typography variant="caption">
          Check if you want to enable debugging for secured<br />
          connections. Not recommended.
          <br />
          <a href="https://routr.io/docs/configuration/general/" className={classes.link2}>
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
