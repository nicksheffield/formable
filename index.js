const { useReducer, useCallback, useMemo } = require('react')

const initialState = {}

const reducer = (state, { type, key, val }) => {
	switch (type) {
		case 'set':
			return { ...state, [key]: val }
		default:
			throw new Error(`Unexpected action type: '${type}'`)
	}
}

const useFormable = data => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const get = useCallback(
		(key, defaultValue = '') => {
			if (state[key] !== undefined) return state[key]
			if (data && data[key] !== undefined) return data[key]
			return defaultValue
		},
		[state, data]
	)

	const set = useCallback((key, val) => dispatch({ type: 'set', key, val }), [])

	const merged = useMemo(() => ({ ...data, ...state }), [data, state])

	return [get, set, merged, state]
}

module.exports = {
	default: useFormable,
}
