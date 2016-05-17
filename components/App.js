import React, { Component } from 'react'
import BraintreeForm from './BraintreeForm'
import DevTools from './DevTools'

const App = () => (
	<div>
		<BraintreeForm />
		{__DEVTOOLS__ &&
			<DevTools />}
	</div>
)

export default App