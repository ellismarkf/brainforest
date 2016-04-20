import { forEach } from 'lodash'
import serialize from 'form-serialize'

export default function rsvpSubmit(event) {
	event.preventDefault()
	const form = document.querySelector('form[name="rsvp"]')
	const data = new FormData()
	forEach(serialize(form, { hash: true }), (val, key) => {
		data.append(key, val)
	})
	var xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://script.google.com/macros/s/AKfycbwPOXWkiSb6EGjS6FiBIUYWhsMqkBq9rFOcrjzHi0_3kkfbfWM/exec')
	xhr.send(data)
}