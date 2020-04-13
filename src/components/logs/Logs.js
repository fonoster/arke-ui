import React from 'react'
import { observer, inject } from 'mobx-react'
import { LazyLog, ScrollFollow } from 'react-lazylog'

class Logging extends React.Component {

  render() {
      return (
        <div style={{ height: 'calc(100vh - 115px)', width: '100%' }}>
          <ScrollFollow
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
                    sock.send(JSON.stringify({message: "Socket has been opened!"}))
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
