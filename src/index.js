import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "mobx-react"
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { appStore } from './stores/app'
import { apiStore } from './stores/api'

const stores = {
  appStore,
  apiStore
}

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
