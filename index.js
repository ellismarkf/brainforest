import React from 'react'
import { render } from 'react-dom'
import rsvpSubmit from './utils/rsvpSubmit'

const App = ({ onclick }) => (
	<div>
		<h1>Mark and Lisy are getting married!</h1>
		<form acceptCharset="utf-8" encType="multipart/form-data" name='rsvp' onSubmit={onclick}>
			<input type="text" placeholder="name"></input>
			<input type="text" placeholder="email"></input>
			<button type="submit" onclick={onclick} >RSVP</button>
		</form>
	</div>
)

render(<App onclick={rsvpSubmit}/>, document.getElementById('root'))