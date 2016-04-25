import React from 'react'
import { pure } from 'recompose'

const FormField = (
		{ 	
			type,
			name,
			label,
			placeholder,
			onChange,
			onFocus,
			onBlur,
			isPotentiallyValid,
			value,
			focused,
			card
		}
	) => {
	const rowClass = focused ? 'input-row-active' : 'input-row'
	const inputField = isPotentiallyValid ? 'input-field' : 'input-field-invalid'
	const fieldName = isPotentiallyValid ? 'input-field-label' : 'input-field-label-invalid'
	const cardType = card ? card.type : ''
	const paymentIcon = card ? 'payment-method-icon-' + cardType : ''
	return(
		<label className={rowClass}>
			{ value !== '' &&
				<span className={fieldName}>{label}</span> }
			<input  name={name}
					value={value}
					type={type}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
					className={inputField}
					placeholder={placeholder}/>
			{ name === 'number' &&
				<span className={paymentIcon}></span> }
			{ !isPotentiallyValid &&
				<div className="invalid-bottom-bar"></div> }
		</label>
	)
}

export default pure(FormField)