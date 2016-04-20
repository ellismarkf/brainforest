import React from 'react'

const RsvpForm = ({ onSubmit }) => (
	<form acceptCharset="utf-8" encType="multipart/form-data" name='rsvp' onSubmit={onSubmit}>
		<input type="text" placeholder="name"></input>
		<input type="text" placeholder="email"></input>
		<button type="submit">RSVP</button>
	</form>
)

export default RsvpForm