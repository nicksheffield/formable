import { useReducer, useMemo } from 'react'

interface Hash {
	[key: string]: any
}

interface Formable {
	get: <T>(field: string, defaultValue?: T) => T
	set: (field: string, value: any) => void
	reset: () => void
}

type formableTuple = [Formable, Hash, Hash]

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

	const merged = useMemo(() => ({ ...data, ...state }), [data, state])

	const formable = {
		get: (key: string, defaultValue: any = '') => {
			if (state[key] !== undefined) return state[key]
			if (data && data[key] !== undefined) return data[key]
			return defaultValue
		},
		set: (key: string, val: any) => dispatch({ type: 'set', key, val }),
		reset: () => dispatch({ type: 'reset' }),
	}

	return [formable, merged, state]
}

export default useFormable
