import { useReducer, useCallback, useMemo } from 'react'

interface Hash {
	[key: string]: any
}

type formableTuple = [
	<T>(field: string, defaultValue?: T) => T,
	(field: string, value: any) => void,
	Hash,
	Hash,
	() => void
]

const initialState = {}

const reducer = (state: Hash, { type, key, val }: Hash): Hash => {
	switch (type) {
		case 'set':
			return { ...state, [key]: val }
		case 'reset':
			return initialState
		default:
			throw new Error(`Unexpected action type: '${type}'`)
	}
}

const useFormable = (data?: Hash): formableTuple => {
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

export default useFormable
