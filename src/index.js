import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import Background from './components/Background'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <Background>
      <App />
    </Background>
  </Provider>,
  document.getElementById('root')
)
