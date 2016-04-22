import React, { Component } from 'react'

class DonateInput extends Component {
	constructor(props) {
		super(props)
		this.state = { value: '', inputValid: null }
	}

	onChange = (e) => {
		this.setState({ value: e.target.value })
	}

	render() {
		const { type, validator } = this.props
		const { value } = this.state
		return(
			<input value={value} type={type} onChange={this.onChange} className='card-field'/>
		)
	}
}

export default DonateInput