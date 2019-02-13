import React, { Component } from 'react'

const Formable = InnerComponent => {
	class Form extends Component {
		static defaultProps = {
			onUpdate: () => {},
			data: {},
		}

		state = {
			changes: {},
		}

		setValue = (key, value) => {
			this.setState(
				{
					changes: { ...this.state.changes, [key]: value },
				},
				this.update
			)
		}

		update = () => {
			this.props.onUpdate(
				{
					...this.props.data,
					...this.state.changes,
				},
				this.state.changes
			)
		}

		getValue = (key, defaultValue = '') => {
			if (typeof this.state.changes[key] !== 'undefined') return this.state.changes[key]
			if (typeof this.props.data[key] !== 'undefined') return this.props.data[key]

			return defaultValue
		}

		componentDidUpdate(prevProps) {
			if (prevProps.data !== this.props.data) {
				this.update()
			}
		}

		render() {
			return <InnerComponent {...this.props} set={this.setValue} get={this.getValue} changes={this.state.changes} />
		}
	}

	return Form
}

export default Formable
