require('es6-promise').polyfill()
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import weddingApp from './reducers'
import DevTools from './components/DevTools'
import App from './components/App'
import './style/styles.less'

const store = createStore(
	weddingApp,
	compose(
		applyMiddleware(thunk),
		DevTools.instrument()
	)
)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

