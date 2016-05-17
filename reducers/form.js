const initialState = {
	fields: [
		{
			name: 'number',
			value: '',
			isValid: false,
			isPotentiallyValid: true,
			focused: false,
			label: 'Card Number',
			placeholder: 'Card Number',
			required: true,
			errorMsg: '',
			card: {
			  	type: '',
			  	isAmex: false,
			  	gaps: []
			}
		} , {
			name: 'expirationDate',
			value: '',
			isValid: false,
			isPotentiallyValid: true,
			focused: false,
			label: 'MMYY',
			placeholder: 'Expiration Date',
			required: true,
			errorMsg: ''
		}, {
			name: 'cardholderName',
			value: '',
			isValid: false,
			isPotentiallyValid: true,
			focused: false,
			label: 'Cardholder Name',
			placeholder: 'Cardholder Name',
			required: true,
			errorMsg: ''
		} , {
			name: 'cvv',
			value: '',
			isValid: false,
			isPotentiallyValid: true,
			focused: false,
			label: 'CVV',
			placeholder: 'CVV',
			required: true,
			errorMsg: ''
		}
	],
	token: null,
	hasSubmissionError: false,
	submissionErrorMsg: '',
	submitted: false
}

const form = (state = initialState, action) => {
	switch (action.type) {
		case 'RECEIVE_TOKEN':
			const { token } = action
			return Object.assign({}, state, {
				token
			})
		case 'UPDATE_FORM_STATUS':
			const { submitted } = action
			return Object.assign({}, state, {
				submitted
			})
		case 'UPDATE_FIELD_VALUE':
		case 'UPDATE_FIELD_FOCUS':
		case 'UPDATE_CARD_INFO':
		case 'UPDATE_FIELD_ERROR_MSG':
			return Object.assign({}, state, {
				fields: state.fields.map( f => field(f, action) )
			})
		default:
			return state
	}
}

const field = (state, action) => {
	if (action.name !== state.name) return state
	switch (action.type) {
		case 'UPDATE_FIELD_VALUE':
			const { value, isValid, isPotentiallyValid } = action
			return Object.assign({}, state, {
				value,
				isValid,
				isPotentiallyValid
			})
		case 'UPDATE_FIELD_FOCUS':
			const { focused } = action
			return Object.assign({}, state, {
				focused
			})
		case 'UPDATE_CARD_INFO':
			return Object.assign({}, state, {
				card: card(state.card, action)
			})
		case 'UPDATE_FIELD_ERROR_MSG':
			const { errorMsg } = action
			return Object.assign({}, state, {
				errorMsg,
				isValid,
				isPotentiallyValid
			})
		default:
			return state
	}
}

const card = (state, action) => {
	switch (action.type) {
		case 'UPDATE_CARD_INFO':
			const { card } = action
			const { type, isAmex, gaps, code } = card
			return Object.assign({}, state, {
				type,
				isAmex,
				gaps,
				code
			})
		default:
			return state
	}
}

export default form