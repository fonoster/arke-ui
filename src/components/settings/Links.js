import React from 'react'
import Link from '@material-ui/core/Link'
import { withStyles } from "@material-ui/core/styles"
import { styles } from './styles'

function Links(props) {
    const { onChangeSection, classes } = props
    const handleChangeSection = (e, section) => {
        e.preventDefault()
        onChangeSection(section)
    }

    return (
      <div>
        <Link color="secondary"
          href="/"
          onClick={e => handleChangeSection(e, 'general')}
          className={classes.link}>
          General
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'networking_and_transport')}
          href="/" className={classes.link}>
          Networking and Transport
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'nat')}
          href="/" className={classes.link}>
          NAT
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'access_control_lists')}
          href="/" className={classes.link}>
          Access Control Lists
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'data_access')}
          href="/" className={classes.link}>
          Data Access
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'rest_service')}
          href="/" className={classes.link}>
          Rest Service
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'certificates')}
          href="/" className={classes.link}>
          Certificates
        </Link>
        <Link color="secondary"
          onClick={e => handleChangeSection(e, 'danger_zone')}
          href="/" className={classes.link}>
          Danger Zone
        </Link>
      </div>
    )
}

export default withStyles(styles)(Links)
