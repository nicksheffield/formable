import { useState } from 'react'

const useFormable = data => {
	const [changes, setChanges] = useState({})

	const get = (key, defaultValue = '') =>
		changes[key] !== undefined
			? changes[key]
			: data && data[key] !== undefined
			? data[key]
			: defaultValue

	const set = (key, value) => setChanges({ ...changes, [key]: value })

	const merged = { ...data, ...changes }

	return [get, set, merged, changes]
}

export default useFormable
