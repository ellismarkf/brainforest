import fetch from 'isomorphic-fetch'

export const updateCardInfo = ({ name, card }) => {
	return {
		type: 'UPDATE_CARD_INFO',
		name,
		card
	}
}

export const updateFieldValue = ({ name, value, isPotentiallyValid, isValid }) => {
	return {
		type: 'UPDATE_FIELD_VALUE',
		name,
		value,
		isPotentiallyValid,
		isValid
	}
}

export const updateFieldFocus = ({ name, focused }) => {
	return {
		type: 'UPDATE_FIELD_FOCUS',
		name,
		focused
	}
}

export const requestClientToken = () => {
	return (dispatch, getState) => {
		return fetch('/client_token')
		.then( res => res.json())
		.then( json => {
			dispatch(receiveClientToken(json.token))
		})
		.catch(function (error) {
		    console.log('request failed: ', error)
		    throw error
		})
	}
}

export const updateFormStatus = (submitted) => {
	return {
		type: 'UPDATE_FORM_STATUS',
		submitted
	}
}

export const updateFieldErrorMsg = ({ name, errorMsg, isValid, isPotentiallyValid }) => {
	return {
		type: 'UPDATE_FIELD_ERROR_MSG',
		name,
		errorMsg,
		isValid,
		isPotentiallyValid
	}
}

const receiveClientToken = (token) => {
	return {
		type: 'RECEIVE_TOKEN',
		token
	}
}