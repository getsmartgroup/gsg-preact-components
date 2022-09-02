import { Td, Tr } from '@chakra-ui/react'
import { Fragment, FunctionalComponent, h } from 'preact'
import { useState } from 'preact/hooks'
import { SimpleTable } from '../SimpleTable'

export type Props = {
	file?: string
	content?: string
}

export const CSVComponent: FunctionalComponent<Props> = ({ file, content }) => {
	console.log(file, content)
	const [headers, setHeaders] = useState<string[]>([])
	const [array, setArray] = useState([])
	return (
		<Fragment>
			{headers ? (
				<SimpleTable headers={headers}>
					{array
						? array.map(i => (
								<Tr>
									{headers.map(h => (
										<Td>{i[h] ?? undefined}</Td>
									))}
								</Tr>
						  ))
						: null}
				</SimpleTable>
			) : null}
		</Fragment>
	)
}
