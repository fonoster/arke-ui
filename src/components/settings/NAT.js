import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import { isValidIp, isValidSubnets} from '../common/utils'

function NAT(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    const isValid = () => isValidIp(config.externAddr) &&
        isValidSubnets(config.localnets)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
        The IP address to advertise. This must be used<br />
        in combination with Localnets. If Localnets
        is<br /> empty, the External Address will be ignored.
        </Typography>
        <br />
        <TextField
          id="externAddr"
          label="External Address"
          value={config.externAddr}
          onChange={onChange}
          className={classes.textField}
          error={!isValidIp(config.externAddr)}
          variant="outlined"
          size="small"
          placeholder="172.220.246.46"
        />
        <br />
        <TextField
          id="localnets"
          label="Localnets"
          multiline
          rowsMax="4"
          rows="3"
          value={config.localnets}
          onChange={onChange}
          error={!isValidSubnets(config.localnets)}
          className={classes.textField}
          variant="outlined"
          size="small"
          placeholder="192.168.1.149/32"
        />
        <br />
        <Typography className={classes.secondaryHeading}>
        Choosing Internal causes the server to use the<br /> IP and port
        it "sees"(received & rport) from a <br /> device attempting
        to register. You will rarely need<br /> to change this.
        </Typography>
        <br />
        <FormControl size="small" variant="outlined" className={classes.textField}>
            <InputLabel>
              Registration Interface
            </InputLabel>
            <Select
              value={config.registrarIntf}
              onChange={onChange}
              labelWidth={155}
              size="small"
            >
              <MenuItem id='registrarIntf' value="Internal">
                <em>Internal</em>
              </MenuItem>
              <MenuItem id='registrarIntf' value="External">
                  External
              </MenuItem>
            </Select>
        </FormControl>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              id="recordRoute"
              onChange={onChange}
              checked={config.recordRoute}
              color="primary"
              size="small"
            />
          }
          label="Record-Route"
        />
        <br />
        <Typography variant="caption">
          Check if you want server to stay within the signaling path
          <br />
          <a target="_blank" rel="noopener noreferrer" href="https://routr.io/docs/configuration/general/" className={classes.link2}>
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

export default withStyles(styles)(NAT)
