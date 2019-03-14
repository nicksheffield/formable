# @nicksheffield/formable

A simple React hook for merging fetched data with user changes. Perfect for edit forms.

---

### Idea

The philosophy of this hook came from my own struggle to find the most acceptable approach to merging "late" api data with form state, in the interest of creating edit forms.

The solution I came up with was to only keep an object containing changes, and merge that with the api data (which may not yet exist).

This way, the api data can come in after a few seconds, but not necessarily mess with form state, thus leaving any user input intact.

### Install

```
npm i -S @nicksheffield/formable
```

### Usage

```
import useFormable from '@nicksheffield/formable'


const MyComponent = () => {

	const [get, set, merged, changes, clear] = useFormable({
		name: 'bob'
	})

	return (
		<div>
			<input type="text" value={get('name')} onChange={e => set('name', e.target.value)} />
			<input type="text" value={get('email')} onChange={e => set('email', e.target.value)} />
		</div>
	)
}
```

In the above code we see a whole bunch of different values output by the `useFormable` hook.

#### `useFormable(data)`

The `data` value passed into the hook represents the original data. This may change over time, such as if an api call resolves.

#### `get(key, defaultValue = '')`

This function will find a value for your input to display. First we look in the current form state (see `changes`). If the value we seek is not valid there, we check the `data` object passed to `useFormable`. If the value is not there either, we will fall back to the `defaultValue` param.

#### `set(key, val)`

This function will set the provided value into the `changes` object.

#### `merged`

This is an object of the `changes` object merged over top of the `data` passed to `useFormable`. This is considered a representation of the whole form data.

#### `changes`

An object containing user edits.

#### `reset()`

This function will reset `changes` back to an empty object, thus wiping user changes.

### Todo

-   explain better
-   finalize api
-   deprecate and move to new package @nicksheffield/useFormable
