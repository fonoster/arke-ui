import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import { isValidSubnets} from '../common/utils'

function AccessControlLists(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    const isValid = () => isValidSubnets(config.aclDeny) &&
        isValidSubnets(config.aclAllow)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
          Denies or allows incoming traffic from network list. <br /> The "Deny Subnets"
          takes presedence over the "Allow Subnets"
        </Typography>
        <br />
        <TextField
          id="aclDeny"
          label="Deny Subnets"
          multiline
          rowsMax="4"
          rows="3"
          value={config.aclDeny}
          onChange={onChange}
          error={!isValidSubnets(config.aclDeny)}
          className={classes.textField}
          variant="outlined"
          size="small"
          placeholder="0.0.0.0/1"
        />
        <br />
        <TextField
          id="aclAllow"
          label="Allow Subnets"
          multiline
          rowsMax="4"
          rows="3"
          value={config.aclAllow}
          onChange={onChange}
          error={!isValidSubnets(config.aclAllow)}
          className={classes.textField}
          variant="outlined"
          size="small"
          placeholder="192.168.1.12/32"
        />
        <br />
        <br />
        <div>
          <Button disabled={!isValid()}onClick={onSave} size="small"
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

export default withStyles(styles)(AccessControlLists)
