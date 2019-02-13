import React, { useState, useEffect } from 'react'

const Formable = FormComponent => ({ data = {}, onUpdate = () => {}, ...props }) => {
	const [changes, setChanges] = useState({})

	const set = (key, value) => setChanges({ ...changes, [key]: value })

	const get = (key, defaultValue = '') =>
		changes[key] !== undefined ? changes[key] : data && data[key] !== undefined ? data[key] : defaultValue

	useEffect(() => {
		onUpdate({ ...data, ...changes }, changes)
	}, [data, changes])

	return <FormComponent {...props} get={get} set={set} changes={changes} />
}

export default Formable
