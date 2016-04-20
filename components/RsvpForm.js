import React from 'react'

const RsvpForm = ({ onSubmit }) => (
	<form acceptCharset='utf-8' encType='multipart/form-data' name='rsvp' onSubmit={onSubmit}>
		<input type='text' name='name' placeholder='name'></input>
		<input type='text' name='email' placeholder='email'></input>
		<br />
		<p>RSVP</p>
		<input type='radio' name='rsvp'></input>Yes
		<input type='radio' name='rsvp'></input>No
		<br />
		<p>plus one</p>
		<input type='radio' name='plus_one'></input>Yes
		<input type='radio' name='plus_one'></input>No
		<br />
		<p>hotel</p>
		<input type='radio' name='needs_hotel_info'></input>Yes
		<input type='radio' name='needs_hotel_info'></input>No
		<br />
		<button type='submit'>RSVP</button>
	</form>
)

export default RsvpForm