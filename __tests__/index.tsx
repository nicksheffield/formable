import * as React from 'react'
import { render, cleanup, act } from 'react-testing-library'
import useFormable from '../src/index'

const testHook = (hookfn: any) => {
	const Comp = ({ children, args }: { children: any; args: any[] }) => children(hookfn(...args))

	const setup = (...args: any[]) => {
		let output: any = {}

		render(
			<Comp args={args}>
				{(val: any) => {
					output = Object.assign(output, val)
					return null
				}}
			</Comp>
		)

		return output
	}

	return setup
}

afterEach(cleanup)

// 0 get(key, defaultVal)
// 1 set(key, val)
// 2 merged
// 3 changes
// 4 reset()

test('get()', () => {
	const hook = testHook(useFormable)()

	expect(hook[0].get('name')).toBe('')
	expect(hook[0].get('name', 'def')).toBe('def')
})

test('set()', () => {
	const hook = testHook(useFormable)()

	act(() => hook[0].set('name', 'bob'))
	expect(hook[0].get('name')).toBe('bob')
	expect(hook[0].get('name', 'def')).toBe('bob')
})

test('merged, changes', () => {
	const hook = testHook(useFormable)({
		name: 'Nick',
		email: 'nick@example.com',
		newsletter: false,
	})

	act(() => hook[0].set('name', 'Jack'))
	act(() => hook[0].set('newsletter', true))

	expect(hook[1]).toEqual({
		email: 'nick@example.com',
		name: 'Jack',
		newsletter: true,
	})

	expect(hook[2]).toEqual({
		name: 'Jack',
		newsletter: true,
	})
})

test('reset()', () => {
	const hook = testHook(useFormable)({
		name: 'Nick',
		email: 'nick@example.com',
		newsletter: false,
	})

	act(() => hook[0].set('name', 'Jack'))
	act(() => hook[0].set('newsletter', true))

	act(() => hook[0].reset())

	expect(hook[1]).toEqual({
		name: 'Nick',
		email: 'nick@example.com',
		newsletter: false,
	})

	expect(hook[2]).toEqual({})
})
