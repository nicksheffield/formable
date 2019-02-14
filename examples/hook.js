const App = props => {
	const [data, setData] = useState()

	useEffect(() => {
		// let's pretend we're doing a fetch to get our data here
		setTimeout(() => {
			setData({
				firstname: 'Bob',
				lastname: 'Smith',
				newsletter: true,
				color: 'blue'
			})
		}, 1000)
	}, [])

	const [get, set, formData, changes] = useFormable(data)

	return (
		<div>
			<div>
				<h1>Edit User</h1>

				<form>
					<div className="form-group">
						<label htmlFor="firstname">First Name</label>
						<input
							type="text"
							id="firstname"
							value={get('firstname')}
							onChange={e => set('firstname', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastname">Last Name</label>
						<input
							type="text"
							id="lastname"
							value={get('lastname')}
							onChange={e => set('lastname', e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="newsletter">Newsletter</label>
						<input
							type="checkbox"
							id="newsletter"
							checked={get('newsletter')}
							onChange={e => set('newsletter', e.target.checked)}
						/>
					</div>
					<div className="form-group">
						<label>Color</label>
						<label>
							<input
								type="radio"
								value="red"
								checked={get('color') === 'red'}
								onChange={e => set('color', e.target.value)}
							/>
							Red
						</label>
						<label>
							<input
								type="radio"
								value="blue"
								checked={get('color') === 'blue'}
								onChange={e => set('color', e.target.value)}
							/>
							Blue
						</label>
						<label>
							<input
								type="radio"
								value="green"
								checked={get('color') === 'green'}
								onChange={e => set('color', e.target.value)}
							/>
							Green
						</label>
					</div>
				</form>

				<div style={{ display: 'flex' }}>
					<div style={{ flex: 1 }}>
						<h2>Data</h2>
						<pre>{JSON.stringify(data, null, 4)}</pre>
					</div>

					<div style={{ flex: 1 }}>
						<h2>Changes</h2>
						<pre>{JSON.stringify(changes, null, 4)}</pre>
					</div>

					<div style={{ flex: 1 }}>
						<h2>Result</h2>
						<pre>{JSON.stringify(formData, null, 4)}</pre>
					</div>
				</div>
			</div>
		</div>
	)
}
