import { ComponentProps, FunctionalComponent, h } from 'preact'
import { Fragment } from 'react'
import { Checkbox, Td, Tr } from '@chakra-ui/react'
import { useMemo } from 'preact/hooks'
import { SimpleTable } from '../SimpleTable'
import { CheckboxIndex, CheckboxIndexItem, useContext as useCheckListContext } from '../CheckList'

export const CheckAll = () => {
	const { name, index, array } = useCheckListContext()
	const value = useMemo(() => (array.array.length === Object.keys(index).length ? array.array[0] : 'null'), [array, index])
	return (
		<Checkbox
			onChange={() => array.set(array.array.length === Object.keys(index).length ? [] : Object.keys(index))}
			name={name}
			value={value}
		/>
	)
}
export const CheckListTable: FunctionalComponent<ComponentProps<typeof SimpleTable> & ComponentProps<typeof CheckboxIndex>> = ({
	name,
	index,
	value,
	headers,
	onChangeIndex,
	children,
	...props
}) => {
	return (
		<CheckboxIndex name={name} index={index} value={value} onChangeIndex={onChangeIndex}>
			<SimpleTable headers={[<CheckAll />, ...(headers ?? [])]} {...props}>
				{children}
			</SimpleTable>
		</CheckboxIndex>
	)
}
export const CheckListTableRows: FunctionalComponent<{
	children: (obj: any, id?: string) => any
} & ComponentProps<typeof Tr>> = ({ children, ...props }) => {
	const { name, index } = useCheckListContext()
	const renderedChildren = useMemo(
		() =>
			Object.entries(index).map(([id, obj]) => {
				return (
					<Tr key={`${name}-${id}`} {...props}>
						<Td>
							<CheckboxIndexItem id={id} />
						</Td>
						{children(obj, id)}
					</Tr>
				)
			}),
		[children, index, name]
	)
	return <Fragment>{renderedChildren}</Fragment>
}
