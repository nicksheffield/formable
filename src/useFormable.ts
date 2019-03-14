const { useReducer, useCallback, useMemo } = require('react')

interface action {
	type: string
	key: string
	val: any
}

const initialState = {}

const reducer = (state: any, { type, key, val }: action): any => {
	switch (type) {
		case 'set':
			return { ...state, [key]: val }
		case 'reset':
			return initialState
		default:
			throw new Error(`Unexpected action type: '${type}'`)
	}
}

const useFormable = (
	data: any
): [<T>(field: string, defaultValue?: T) => T, (field: string, value: any) => void, object, object, () => void] => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const get = useCallback(
		(key: string, defaultValue: any = '') => {
			if (state[key] !== undefined) return state[key]
			if (data && data[key] !== undefined) return data[key]
			return defaultValue
		},
		[state, data]
	)

	const set = useCallback((key: string, val: any) => dispatch({ type: 'set', key, val }), [])

	const merged = useMemo(() => ({ ...data, ...state }), [data, state])

	const reset = useCallback(() => dispatch({ type: 'reset' }), [data])

	return [get, set, merged, state, reset]
}

module.exports = useFormable
