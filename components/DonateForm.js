import React, {Component} from 'react'
import braintree from 'braintree-web'
import * as validate from 'card-validator'

class DonateForm extends Component {
	
	componentDidMount() {
		const { paymentProcessor, token } = this.props
		paymentProcessor.setup(token, 'dropin', {container: 'donate'})
	}
	
	render() {
		console.log(validate)
		return (
			<form id="donate" method="post" action="/checkout">
			  	<div id="payment-form"></div>
			  	<input type="submit" value="Pay $10" />
			</form>		
		)
	}
}

export default DonateForm