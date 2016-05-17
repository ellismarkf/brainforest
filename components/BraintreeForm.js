import React, {Component} from 'react'
import { connect } from 'react-redux'
import braintree from 'braintree-web'
import valid from 'card-validator'
import FormField from './FormField'
import {
	requestClientToken,
	updateFieldValue,
	updateFieldFocus,
	updateCardInfo,
	updateFormStatus,
	updateFieldErrorMsg } from '../actions/forms'
import fetch from 'isomorphic-fetch'

class DonateForm extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(requestClientToken())
	}

	render() {
		const { token, dispatch, fields, submitted } = this.props
		const readyToSubmit = fields.reduce( (result, val, index, arr) => {
			return val.isValid && result
		}, true)
		return (
			<div>
				{!submitted &&
					<form id="donate" onSubmit={this.onSubmit} encType='multipart/form-data' className='donate-form'>
					  	{fields.map( (field, index) =>
					  		<FormField
					  			type='text'
					  			name={field.name}
					  			card={field.card || null}
					  			placeholder={field.placeholder}
					  			label={field.label}
					  			onFocus={ () => this.onFocus(field.name, true) }
					  			onBlur={ () => this.onBlur(field.name, false) }
					  			onChange={ e => this.onChange(e, field.name, ) }
					  			key={index}
					  			value={field.value}
					  			focused={field.focused}
					  			isPotentiallyValid={field.isPotentiallyValid}
					  		/>
					  	)}
					</form>
				}
				{submitted &&
					<h1>Payment submitted</h1>
				}
			</div>
		)
	}

	onChange(e, name) {
		const self = this
		const { dispatch, fields } = this.props
		const { value } = e.target

		if (value === '') {
			if (name === 'number') {
				const emptyCardInfo = { type: '', isAmex: false, gaps: [], card: {} }
				dispatch(updateCardInfo({ name, card: {...emptyCardInfo} }))
			}
			dispatch(updateFieldValue({ name, value, isPotentiallyValid: true, isValid: false }))
			return
		}

		const currentField = fields.find( field => name === field.name )
		const validate = valid[name]

		const handlerMap = {
			number: () => {
				const rawVals = this.getRawVals(name, value)
				const cardValidationInfo = validate(rawVals.join(''))
				const { isPotentiallyValid, isValid } = cardValidationInfo
				const cvvField = fields.find( f => f.name === 'cvv' )
				const cvv = cvvField.value
				// SIDE EFFECT </3
				if (!isPotentiallyValid) {
					const emptyCardInfo = { type: '', isAmex: false, gaps: [], card: {} }
					dispatch(updateCardInfo({ name, card: {...emptyCardInfo} }))
				}
				const gaps = this.findGapIndeces(name, cardValidationInfo)
				const formattedCardVals = this.formatVals(name, rawVals, gaps)
				const { card } = cardValidationInfo
				// SIDE EFFECT </3
				if (card) {
					const { type, gaps, isAmex } = card
					const cardInfo = { type, gaps, isAmex }
					dispatch(updateCardInfo({ name, card: {...cardInfo} }))
					if ( !isAmex && cvv.length > 3 ) {
						dispatch(updateFieldValue({ name: 'cvv', value: cvv, isPotentiallyValid: false, isValid: false }))
					}
					if (isAmex && !cvv.isPotentiallyValid) {
						const cvvv = valid.cvv(cvv)
						dispatch(updateFieldValue({ name: 'cvv', value: cvv, isPotentiallyValid: cvvv.isPotentiallyValid, isValid: cvvv.isValid }))
					}
				}
				return { name, value: formattedCardVals, isPotentiallyValid, isValid }
			},
			cardholderName: () => {
				return { name, value, isPotentiallyValid: true, isValid: true}
			},
			amount: () => {
				const amt = parseInt(value)
				const validAmt = isNaN(amt) ?
					{ name, value, isPotentiallyValid: false, isValid: false } :
					{ name, value, isPotentiallyValid: true, isValid: true }
				return validAmt
			},
			expirationDate: () => {
				const rawVals = this.getRawVals(name, value)
				const expDateValidationInfo = validate(rawVals.join(''))
				const { isPotentiallyValid, isValid } = expDateValidationInfo
				const gaps = this.findGapIndeces(name, expDateValidationInfo)
				const formattedDateVals = this.formatVals(name, rawVals, gaps)
				return { name, value: formattedDateVals, isPotentiallyValid, isValid }
			},
			cvv: () => {
				const isAmex = fields.find( f => f.name === 'number').card.isAmex
				const cvvValidationInfo = isAmex ? validate(value, 4) : validate(value, 3)
				const { isPotentiallyValid, isValid } = cvvValidationInfo
				return { name, value, isPotentiallyValid, isValid }
			}
		}
		const inputVals = handlerMap[name]()
		dispatch(updateFieldValue({...inputVals}))
	}

	onFocus = (name, focused) => {
		const { dispatch } = this.props
		dispatch(updateFieldFocus({ name, focused }))
	}

	onBlur = (name, focused) => {
		const { dispatch, fields } = this.props
		const currentField = fields.find( field => name === field.name )
		const { required, value, isValid, isPotentiallyValid } = currentField
		const requiredFieldEmpty = required && value === ''
		const fieldNotValid = !isValid ? true : false
		if ( requiredFieldEmpty || fieldNotValid ) {
			dispatch(updateFieldValue({ name, value, isPotentiallyValid: false, isValid: false }))
		}
		dispatch(updateFieldFocus({ name, focused }))
	}

	getRawVals = (name, value) => {
		const regexMap = {
			number: /\s/g,
			expirationDate: /\D/g,
			final: /\s/g
		}
		return value.replace(regexMap[name], '').split('')
	}

	findGapIndeces = (name, validationInfo) => {	
		const gapMap = {
			number: validationInfo.card ? validationInfo.card.gaps : null,
			expirationDate: [2]
		}
		return gapMap[name]
	}

	getSpacerText = (name) => {
		const spacerTextMap = {
			number: ' ',
			expirationDate: ' / '
		}
		return spacerTextMap[name]
	}

	formatVals = (name, rawVals, gaps) => {
		const self = this
		const formattedVals = rawVals.map( (val, index) => {
			const placeholderIndex = gaps ? gaps.find( (gapIndex) => {
				return gapIndex === index
			}) : null
			return placeholderIndex ? (self.getSpacerText(name) + val) : val
		}).join('')
		return formattedVals
	}

	onSubmit = (e) => {
		e.preventDefault()
		const { token, fields, dispatch } = this.props
		const braintreeClient = new braintree.api.Client({ clientToken: token })
		const paymentMethod = fields.reduce( (result, field) => {
			const rawVal = field.name === 'cardholderName' ? field.value : this.getRawVals('final', field.value).join('')
			const fieldVals = field.name === 'amount' ? {} : { [field.name]: rawVal }
			return Object.assign({}, result, fieldVals)
		}, {})
		const amt = fields.find( f => f.name === 'amount' ).value
		const data = new FormData()
		data.append('amount', amt)

		braintreeClient.tokenizeCard({...paymentMethod}, (err, nonce) => {
			data.append('paymentMethodNonce', nonce)
			fetch('/donate', {
				method: 'POST',
				body: data
			})
			.then( res => res.json())
			.then( json => {
				if (json.result.success) {
					console.log(json)
					dispatch(updateFormStatus(true))
				} else {
					console.log(json)
					const { deepErrors } = json
					if (deepErrors) {
						const capitalizedAttributes = deepErrors.map( err => {
							const { message } = err
							const name = err.attribute.split('_').map( (a, i) => {
								if ( i > 0) {
									return a[0].toUpperCase() + a.slice(1)
								} else {
									return a
								}
							}).join('')
							return {
								name,
								errorMsg: message,
								isValid: false,
								isPotentiallyValid: false
							}
						})
						console.log(capitalizedAttributes)
						capitalizedAttributes.forEach( a => {
							const { name, errorMsg, isValid, isPotentiallyValid } = a
							dispatch(updateFieldErrorMsg({ name, errorMsg, isValid, isPotentiallyValid }))
						})
					}
				}
			})
		})
	}
}

const mapStateToProps = (state) => ({
	fields: state.form.fields,
	token: state.form.token,
	hasSubmissionError: state.form.hasSubmissionError,
	submissionErrorMsg: state.form.submissionErrorMsg,
	submitted: state.form.submitted 
})

export default connect(mapStateToProps)(DonateForm)