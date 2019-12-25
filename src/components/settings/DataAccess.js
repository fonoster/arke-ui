import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'
import { isValidDSParameter} from '../common/utils'

function DataAccess(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    const isValid = () => isValidDSParameter(config.dsParameters)

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
          Defines data provider. The recommended provider for production is <br />
          <em>redis_data_provider.</em>
        </Typography>
        <br />
        <FormControl size="small" variant="outlined" className={classes.formControl}>
            <InputLabel>
              Data Source Provider
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              value={config.dsProvider}
              onChange={onChange}
              labelWidth={155}
            >
              <MenuItem id='dsProvider' value="files_data_provider">
                <em>Files Data Source</em>
              </MenuItem>
              <MenuItem id='dsProvider' value="redis_data_provider">Redis Data Provider</MenuItem>
            </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          id="dsParameters"
          label="Data Source Parameters"
          value={config.dsParameters}
          onChange={onChange}
          className={classes.textField}
          error={!isValidDSParameter(config.dsParameters)}
          variant="outlined"
          size="small"
          placeholder="host=localhost,port=6379"
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

export default withStyles(styles)(DataAccess)
