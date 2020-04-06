import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import { isValidIp, isValidPort } from '../common/utils'

function NetworkingAndTransport(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    // TODO: It should also prevent ports to repeat, unless is udp and tcp
    const isValid = () => isValidIp(config.bindAddr)
      && isValidPort(config.transportPorts.udp)
      && isValidPort(config.transportPorts.tcp)
      && isValidPort(config.transportPorts.tls)
      && isValidPort(config.transportPorts.ws)
      && isValidPort(config.transportPorts.wss)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
        This is the default IP address for the SIP stack. <br />
        All Sip traffic will be routed through this interface.
        </Typography>
        <br />
        <TextField
          id="bindAddr"
          label="Bind Address"
          value={config.bindAddr}
          onChange={onChange}
          className={classes.textField}
          error={!isValidIp(config.bindAddr)}
          variant="outlined"
          size="small"
          placeholder="192.168.1.12"
        />
        <br />
        <TextField
          id="udpPort"
          label="UDP Port"
          onChange={onChange}
          className={classes.textField}
          value={config.transportPorts.udp}
          error={!isValidPort(config.transportPorts.udp)}
          variant="outlined"
          size="small"
          placeholder="5060"
          inputProps = {{maxLength:5}}
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          You can use the same port number for both TCP<br /> and UDP.
        </Typography>
        <br />
        <TextField
          id="tcpPort"
          label="TCP Port"
          onChange={onChange}
          className={classes.textField}
          value={config.transportPorts.tcp}
          error={!isValidPort(config.transportPorts.tcp)}
          variant="outlined"
          size="small"
          placeholder="5060"
          inputProps = {{maxLength:5}}
        />
        <br />
        <Typography className={classes.secondaryHeading}>
          Secure transport, like TLS and WSS, required<br />
          a valid certificate to secure the SIP signaling.
        </Typography>
        <br />
        <TextField
          id="tlsPort"
          label="TLS Port"
          onChange={onChange}
          className={classes.textField}
          value={config.transportPorts.tls}
          error={!isValidPort(config.transportPorts.tls)}
          variant="outlined"
          size="small"
          placeholder="5061"
          inputProps = {{maxLength:5}}
        />
        <br />
        <TextField
          id="wsPort"
          label="WS Port"
          onChange={onChange}
          className={classes.textField}
          value={config.transportPorts.ws}
          error={!isValidPort(config.transportPorts.ws)}
          variant="outlined"
          size="small"
          placeholder="5062"
          inputProps = {{maxLength:5}}
        />
        <br />
        <TextField
          id="wssPort"
          label="WSS Port"
          onChange={onChange}
          className={classes.textField}
          value={config.transportPorts.wss}
          error={!isValidPort(config.transportPorts.wss)}
          variant="outlined"
          size="small"
          placeholder="5063"
          inputProps = {{maxLength:5}}
        />
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
