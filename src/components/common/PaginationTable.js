import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import RefreshIcon from '@material-ui/icons/Refresh'
import { observer, inject } from 'mobx-react'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { toTitleCase } from '../common/utils'

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, columnData } = this.props

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})

let PaginationTableToolbar = props => {
  const { classes, name, handleRefresh } = props

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {toTitleCase(name)}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh" onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  )
}

PaginationTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

PaginationTableToolbar = withStyles(toolbarStyles)(PaginationTableToolbar)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  }
})

class EnhancedTable extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      data: props.data,
      page: 0,
      rowsPerPage: 5,
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes, columnData, data, name } = this.props
    const { order, orderBy, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <PaginationTableToolbar name={ name } handleRefresh={
          e => this.props.apiStore.loadResources(this.props.appStore.getCurrentSection())
        }/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              columnData={ columnData }
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={n.c1}>
                    <TableCell component="th" scope="row">
                      {n.c1}
                    </TableCell>
                    <TableCell>{n.c2}</TableCell>
                    { n.c3 && <TableCell>{n.c3}</TableCell> }
                    { n.c4 && <TableCell>{n.c4}</TableCell>  }
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default inject('apiStore')(inject('appStore')(withStyles(styles)(observer(EnhancedTable))))
