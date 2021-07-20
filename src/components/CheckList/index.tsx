import { ComponentProps, FunctionalComponent, h, VNode } from 'preact'
import { ChangeEvent, Fragment } from 'react'
import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps, Td, Tr } from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { useCallback, useEffect, useMemo } from 'preact/hooks'
import { useArray } from '../../hooks'
import { SimpleTable } from '../SimpleTable'

export type Props = {
	name: string
	index: Record<string, any>
	value?: string[]
	onChangeIndex?: <T = any>(data: Record<string, T>) => any
	onChangeArray?: <T = any>(data: T[]) => any
}

export const useCheckboxIndex = ({ name, index, value, onChangeIndex, onChangeArray }: Props) => {
	const array = useArray(value ?? [])
	useEffect(() => {
		array.set(array.array.filter(f => Object.keys(index).includes(f)))
	}, [index])
	useEffect(() => {
		array.set(value ?? [])
	}, [value])
	useEffect(() => {
		if (onChangeIndex) {
			onChangeIndex(
				array.array.reduce<Record<string, any>>((acc, id) => {
					const i = index[id]
					if (i) acc[id] = i
					return acc
				}, {})
			)
		}
		if (onChangeArray) {
			onChangeArray(array.array.map(id => index[id]))
		}
	}, [array])
	return {
		name,
		index,
		array,
		value
	}
}

export const [ContextProvider, useContext] = createContext<ReturnType<typeof useCheckboxIndex>>()

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

export const CheckListTable: FunctionalComponent<ComponentProps<typeof SimpleTable> & ComponentProps<typeof CheckboxIndex>> = ({
	name,
	index,
	value,
	onChangeIndex,
	onChangeArray,
	children,
	...props
}) => {
	return (
		<CheckboxIndex name={name} index={index} value={value} onChangeIndex={onChangeIndex} onChangeArray={onChangeArray}>
			<SimpleTable {...props}>{children}</SimpleTable>
		</CheckboxIndex>
	)
}
export const CheckListTableRows: FunctionalComponent<{
	children: (obj: any) => any
}> = ({ children }) => {
	const { name, index } = useContext()
	return (
		<Fragment>
			{Object.entries(index).map(([id, obj]) => {
				return (
					<Tr key={`${name}-${id}`}>
						<Td>
							<CheckboxIndexItem id={id} />
						</Td>
						{children(obj)}
					</Tr>
				)
			})}
		</Fragment>
	)
}
