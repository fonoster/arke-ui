import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import SettingsIcon from '@material-ui/icons/Settings'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'

function SettingsBreadcrumbs(props) {
    const { onChangeSection, currentSection, classes } = props
    const sectionsDesc = {
        home: 'General',
        general: 'General',
        networking_and_transport: 'Networking and Transport',
        nat: 'NAT',
        certificates: 'Certificates',
        access_control_lists: 'Access Control Lists',
        rest_service: 'Rest Service',
        data_access: 'Data Access',
    }
    const handleChangeSection = (e, section) => {
        e.preventDefault()
        onChangeSection(section)
    }

    return (
      <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/"
              onClick={e => handleChangeSection(e, 'home')}
              className={classes.bcLink}>
              <SettingsIcon className={classes.icon} />
              Settings
            </Link>
            {
              currentSection !== 'home' &&
              <Typography color="textPrimary">{sectionsDesc[currentSection]}</Typography>
            }
          </Breadcrumbs>
      </div>
    )
}

export default withStyles(styles)(SettingsBreadcrumbs)
