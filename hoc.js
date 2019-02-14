import React, { Component } from 'react'

const Formable = FormComponent => {
	class Form extends Component {
		static defaultProps = {
			onUpdate: () => {},
			data: {}
		}

		state = {
			changes: {}
		}

		set = (key, value) => {
			this.setState(
				{ changes: { ...this.state.changes, [key]: value } },
				this.update
			)
		}

		update = () => {
			this.props.onUpdate(
				{ ...this.props.data, ...this.state.changes },
				this.state.changes
			)
		}

		get = (key, defaultValue = '') => {
			if (this.state.changes[key] !== undefined)
				return this.state.changes[key]
			if (this.props.data && this.props.data[key] !== undefined)
				return this.props.data[key]

			return defaultValue
		}

		componentDidUpdate(prevProps) {
			if (prevProps.data !== this.props.data) {
				this.update()
			}
		}

		render() {
			return (
				<FormComponent
					{...this.props}
					set={this.set}
					get={this.get}
					changes={this.state.changes}
				/>
			)
		}
	}

	return Form
}

export default Formable
