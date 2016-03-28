export default function rsvpSubmit(event) {
	// debugger
	event.preventDefault();
	console.log('button clicked!');
	const inputs = document.querySelectorAll('input[type="text"]');
	const data = new FormData();
	for (let i = 0 ; i < inputs.length ; i++) {
		data.append(inputs[i].placeholder, inputs[i].value)
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://script.google.com/macros/s/AKfycbwPOXWkiSb6EGjS6FiBIUYWhsMqkBq9rFOcrjzHi0_3kkfbfWM/exec')
	xhr.send(data)
}