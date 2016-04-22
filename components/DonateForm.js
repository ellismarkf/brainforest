import React, {Component} from 'react'
import braintree from 'braintree-web'
import valid from 'card-validator'
import DonateInput from './DonateInput'

class DonateForm extends Component {
	
	componentDidMount() {
		// const { paymentProcessor, token } = this.props
		// paymentProcessor.setup(token, 'dropin', {container: 'donate'})
	}
	
	render() {
		const { token } = this.props
		console.log(valid.number)
		return (
			<form id="donate" method="post" action="/donate" encType='multipart/form-data'>
			  	<DonateInput type='text' name='number' validator={valid.number}/>
			  	<span className='payment-method-icon-visa'></span>
			  	<input type="submit" value="Pay $10" />
			</form>		
		)
	}
}

export default DonateForm