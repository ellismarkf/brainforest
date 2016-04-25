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

const receiveClientToken = (token) => {
	return {
		type: 'RECEIVE_TOKEN',
		token
	}
}