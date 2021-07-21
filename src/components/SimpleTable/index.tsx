import { Fragment, FunctionalComponent, h } from 'preact'
import { Table, TableProps, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { useMemo } from 'preact/hooks'
export type Props = { headers: Array<string | any> } & TableProps

export const SimpleTable: FunctionalComponent<Props> = ({ headers, children, ...props }) => {
	const headerTags = useMemo(() => headers.map(header => <Th>{header}</Th>), [headers])
	return (
		<Table whiteSpace='nowrap' w='100%' variant='simple' {...props}>
			<Thead>
				<Tr>{headerTags}</Tr>
			</Thead>
			<Tbody>{children}</Tbody>
			<Tfoot>
				<Tr>{headerTags}</Tr>
			</Tfoot>
		</Table>
	)
}
