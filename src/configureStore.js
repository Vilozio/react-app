import thunkMiddleware from 'redux-thunk'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import DevTools from './containers/DevTools'
import reducers from './reducers'

let middleware = [
  routerMiddleware(hashHistory)
]

const enchancer = __DEV__ && document.addEventListener
  ? compose(
    applyMiddleware(
      ...middleware,
      thunkMiddleware),
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
  ))
  : compose(
    applyMiddleware(
      ...middleware,
      thunkMiddleware))

export default function configureStore (initialState) {
  return createStore(
    reducers,
    initialState,
    enchancer)
}
