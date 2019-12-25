import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'

function General(props) {
    const {
      onSave,
      onCancel,
      config,
      onChange,
      classes
    } = props

    return (
      <div>
        <Typography className={classes.secondaryHeading}>
          Sets sip header User-Agent to the desired value. <br /> If
          not value is provided the server will use <em>`Routr $version.`</em>
        </Typography>
        <br />
        <TextField
          id="userAgent"
          label="User Agent"
          multiline
          rowsMax="4"
          value={config.userAgent}
          onChange={onChange}
          className={classes.textField}
          size="small"
          variant="outlined"
          placeholder="Routr v1.0"
        />
        <br />
        <br />
        <div>
          <Button onClick={onSave} size="small"
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

export default withStyles(styles)(General)
