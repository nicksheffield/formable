# @nicksheffield/formable

A simple React HOC for merging fetched data with user changes. Perfect for edit forms.

---

### Example

```
class App extends Component {
	state = {
		data: {},
		formData: null,
		changes: null
	}

	async componentDidMount() {

		// let's just pretend this is a fetch and we got a result
		setTimeout(() => {
			this.setState({
				data: {
					firstname: 'bob',
					lastname: 'smith',
					email: 'bob@example.com'
				}
			})
		}, 1000)
	}

	render() {
		return (
			<div className="App container">
				<h1>Yo</h1>

				<MyForm data={this.state.data} onUpdate={(formData, changes) => this.setState({ formData, changes })} />

				<h2>Original Data</h2>
				<pre>{JSON.stringify(this.state.data, null, 4)}</pre>

				<h2>Changes</h2>
				<pre>{JSON.stringify(this.state.changes, null, 4)}</pre>

				<h2>Final Result</h2>
				<pre>{JSON.stringify(this.state.formData, null, 4)}</pre>
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
			<label htmlFor="email">Email</label>
			<input
				type="email"
				id="email"
				value={get('email')}
				onChange={e => set('email', e.target.value)}
				className="form-control"
			/>
		</div>
	</form>
))
```
