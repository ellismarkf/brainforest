import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import braintree from 'braintree-web'

class DropInPaymentUI extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		fetch('/client_token')
			.then( res => res.json())
			.then( json => {
				braintree.setup(json.token, 'dropin', {
					container: 'payment-container'
				})
			})
	}

	render() {
		return (
			<form>
				<div id='payment-container'></div>
			</form>
		)
	}
}

export default DropInPaymentUI