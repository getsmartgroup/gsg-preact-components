import { ComponentProps, FunctionalComponent, h, Fragment } from 'preact'
import { useMemo } from 'preact/hooks'

import { Checkbox, Td, Tr } from '@chakra-ui/react'

import { SimpleTable } from '@components/SimpleTable'
import { CheckboxIndex, CheckboxIndexItem, CheckboxIndexAll, useContext as useCheckListContext } from '@components/CheckboxIndex'

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
			<SimpleTable headers={[<CheckboxIndexAll />, ...(headers ?? [])]} {...props}>
				{children}
			</SimpleTable>
		</CheckboxIndex>
	)
}
export const CheckListTableRow: FunctionalComponent<{
	id : string
}> = ( { id, children, ...props } ) => {
	const { name } = useCheckListContext()
	return 	<Tr key={`${name}-${id}`} {...props}>
		<Td>
			<CheckboxIndexItem id={id} />
		</Td>
		{children}
	</Tr>
}
export const CheckListTableRows: FunctionalComponent<{
	children: (obj: any, id?: string) => any
} & ComponentProps<typeof Tr>> = ({ children, ...props }) => {
	const { name, index } = useCheckListContext()
	const renderedChildren = useMemo(
		() =>
			Object.entries(index).map(([id, obj]) => {
				return (
					<CheckListTableRow id={id} {...props} >
						{children(obj, id)}
					</CheckListTableRow>
				)
			}),
		[children, index, name]
	)
	return <Fragment>{renderedChildren}</Fragment>
}
