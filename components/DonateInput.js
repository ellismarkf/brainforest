import React, { Component } from 'react'

class DonateInput extends Component {
	constructor(props) {
		super(props)
		this.state = { value: null }
	}

	onChange = (e) => {
		this.setState({ value: e.target.value })
	}

	render() {
		const { name } = this.props
		const { value } = this.state
		return(
			<input data-braintree-name={name} value={value} onChange={this.onChange} />
		)
	}
}

export default DonateInput