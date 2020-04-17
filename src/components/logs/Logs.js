import React from 'react'
import Typography from '@material-ui/core/Typography'
import LogsIcon from '@material-ui/icons/Assignment'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import Button from '@material-ui/core/Button'
import { observer, inject } from 'mobx-react'
import { LazyLog, ScrollFollow } from 'react-lazylog'
import download from 'downloadjs'

class Logging extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sock: null,
      open: true,
      reConnect: false
    }
  }

  render() {
      return (
        <div style={{ height: 'calc(100vh - 215px)', width: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <LogsIcon color="primary" size="small" />
            <Typography color="primary" variant="h6" id="tableTitle">
                Server's Logs
            </Typography>
          </div>

          <div style={{ marginTop: 25, marginBottom: 15 }}>
            <Button
            style={{ marginRight: 5 }}
            variant="contained"
            size="small"
            color="secondary"
            startIcon={this.state.open ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={() => {
              if (this.state.open) {
                this.state.sock && this.state.sock.close()
              } else {
                this.setState({reConnect: !this.state.reConnect})
              }
              this.setState({open: !this.state.open})
            }}>Play live</Button>

            <Button
              onClick={async() =>
              download(await this.props.apiStore.getSystemLogs(),
                'routr.log', 'text/plain')}
              variant="outlined" size="small">Download Logs</Button>
          </div>

          <ScrollFollow
            key={this.state.reConnect}
            startFollowing={true}
            render={({ follow, onScroll }) => (
              <LazyLog
                enableSearch
                url={this.props.apiStore.getSystemLogsURL()}
                websocket
                follow={follow}
                onScroll={onScroll}
                websocketOptions={{
                  onOpen: (e, sock) => {
                    this.setState({sock})
                    this.state.sock.send(JSON.stringify({message: "Open channel!"}))
                  },
                  formatMessage: e => e,
                }}
              />
            )}
          />
        </div>
      );
  }
}

export default inject('apiStore')(observer(Logging))
