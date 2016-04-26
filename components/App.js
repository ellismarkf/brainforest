import React, { Component } from 'react'
import rsvpSubmit from '../utils/rsvpSubmit'
import RsvpForm from './RsvpForm'
import DonateForm from './DonateForm'
import DevTools from './DevTools'

const App = () => (
	<div>
		<h1>Mark and Lisy are getting married!</h1>
		<RsvpForm onSubmit={rsvpSubmit} />
		<DonateForm />
		{__DEVTOOLS__ &&
			<DevTools />}
	</div>
)

export default App