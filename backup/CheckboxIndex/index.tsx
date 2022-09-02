import { FunctionalComponent, h } from 'preact'
import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { ChangeEvent } from 'react'

import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'

import { useArray } from '@hooks'

export type Props = {
	name: string
	index: Record<string, any>
	value?: string[]
	onChangeIndex?: <T extends any = any>(data: Record<string, T>, ids?: string[]) => any
}

export const useCheckboxIndex = ({ name, index, value, onChangeIndex }: Props) => {
	const propsValue = useMemo(() => value ?? [], [value])
	const array = useArray(propsValue)
	useEffect(() => {
		array.set(array.array.filter(f => Object.keys(index).includes(f)))
	}, [index])
	useEffect(() => {
		if (value !== propsValue) {
			array.set(propsValue)
		}
	}, [value])
	const indexed = useMemo(() => {
		return array.array.reduce<Record<string, any>>((acc, id) => {
			const i = index[id]
			if (i) acc[id] = i
			return acc
		}, {})
	}, [array.array, index])
	const indexedCb = useCallback(() => {
		if (onChangeIndex) onChangeIndex(indexed, array.array)
	}, [indexed, array.array, onChangeIndex, index])

	useEffect(() => {
		indexedCb()
	}, [array.array, indexed, index])
	return {
		name,
		index,
		array,
		value
	}
}

export const [ContextProvider, useContext] = createContext<ReturnType<typeof useCheckboxIndex>>()

export const CheckboxIndex: FunctionalComponent<Props & CheckboxGroupProps> = ({
	name,
	index,
	value,
	onChangeIndex,
	children,
	...props
}) => {
	const ctx = useCheckboxIndex({ name, index, value, onChangeIndex })
	return (
		<ContextProvider value={ctx}>
			<CheckboxGroup value={ctx.array.array} {...props}>
				{children}
			</CheckboxGroup>
		</ContextProvider>
	)
}

export const CheckboxIndexItem = ({ id, onChange, ...props }: { id: string } & CheckboxProps) => {
	const { name, index, array } = useContext()
	const wrappedOnChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				array.push(id)
			} else {
				array.remove(id)
			}
			if (onChange) {
				onChange(e)
			}
		},
		[id, index, array]
	)
	return <Checkbox name={name} onChange={wrappedOnChange} value={id} {...props} />
}

export const CheckboxIndexAll = () => {
	const { name, index, array } = useContext()
	const value = useMemo(() => (array.array.length === Object.keys(index).length ? array.array[0] : 'null'), [array, index])
	return (
		<Checkbox
			onChange={() => array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index))}
			name={name}
			value={value}
		/>
	)
}
