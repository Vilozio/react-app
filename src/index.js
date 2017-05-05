import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './components/App'
import Background from './components/Background'
import DevTools from './containers/DevTools'
import Grid from './components/Grid'

let store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Background>
      <DevTools />
      <Router history={history}>
        <Route path="/">
          <IndexRoute component={Grid} />
          <Route path='main'>
            <IndexRoute component={App} />
          </Route>
        </Route>
      </Router>
    </Background>
  </Provider>,
  document.getElementById('root')
)
