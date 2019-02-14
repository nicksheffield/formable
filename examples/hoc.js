class App extends Component {
	state = {
		data: null,
		formData: null,
		changes: null // you don't need this normally, it's just for displaying below
	}

	componentDidMount() {
		// let's pretend we're doing a fetch to get our data here
		setTimeout(() => {
			this.setState({
				data: {
					firstname: 'Bob',
					lastname: 'Smith',
					newsletter: true,
					color: 'blue'
				}
			})
		}, 1000)
	}

	render() {
		return (
			<div className="App container">
				<h1>Yo</h1>

				<MyForm
					data={this.state.data}
					onUpdate={(formData, changes) =>
						this.setState({ formData, changes })
					}
				/>

				<div style={{ display: 'flex' }}>
					<div style={{ flex: 1 }}>
						<h2>Data</h2>
						<pre>{JSON.stringify(this.state.data, null, 4)}</pre>
					</div>

					<div style={{ flex: 1 }}>
						<h2>Changes</h2>
						<pre>{JSON.stringify(this.state.changes, null, 4)}</pre>
					</div>

					<div style={{ flex: 1 }}>
						<h2>Result</h2>
						<pre>
							{JSON.stringify(this.state.formData, null, 4)}
						</pre>
					</div>
				</div>
			</div>
		)
	}
}

const MyForm = Formable(({ get, set }) => (
	<form>
		<div className="form-group">
			<label htmlFor="firstname">First Name</label>
			<input
				type="text"
				id="firstname"
				value={get('firstname', 'default')}
				onChange={e => set('firstname', e.target.value)}
				className="form-control"
			/>
		</div>

		<div className="form-group">
			<label htmlFor="lastname">Last Name</label>
			<input
				type="text"
				id="lastname"
				value={get('lastname')}
				onChange={e => set('lastname', e.target.value)}
				className="form-control"
			/>
		</div>

		<div className="form-group">
			<label>
				Newsletter{' '}
				<input
					type="checkbox"
					checked={get('newsletter', false)}
					onChange={e => set('newsletter', e.target.checked)}
				/>
			</label>
		</div>

		<div className="form-group">
			<label>Color</label>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<label>
					<input
						type="radio"
						value="red"
						checked={get('color') === 'red'}
						onChange={e => set('color', e.target.value)}
					/>{' '}
					Red
				</label>
				<label>
					<input
						type="radio"
						value="blue"
						checked={get('color') === 'blue'}
						onChange={e => set('color', e.target.value)}
					/>{' '}
					Blue
				</label>
				<label>
					<input
						type="radio"
						value="green"
						checked={get('color') === 'green'}
						onChange={e => set('color', e.target.value)}
					/>{' '}
					Green
				</label>
			</div>
		</div>
	</form>
))