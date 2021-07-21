import { Fragment, h } from 'preact'
import {
	Center,
	Checkbox,
	CheckboxGroup,
	Heading,
	HStack,
	IconButton,
	InputGroup,
	InputRightElement,
	Select,
	Spinner,
	Td,
	VStack,
	Wrap
} from '@chakra-ui/react'
import { useWC, useRestClient, WrappedCRUD, InferT } from '../context'
import { PaginationProvider, PaginationNav, PaginationSearch, PaginationProps, PaginatedCheckListTable } from '../pagination'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { CheckListTableRows } from '../../components/CheckListTable'
import { useArray } from '../../hooks'
import { useCallback, useState } from 'preact/hooks'

export const useOrder = () => {
	const crud = useWC().client.Order.crud
	return useRestClient(crud)
}

export type Props<
	W extends WrappedCRUD<any, any>,
	T = InferT<W['crud']>,
	H extends Partial<{ [K in keyof T]: string }> = Partial<{ [K in keyof T]: string }>
> = {
	name: string
	headers: H
	display: Array<keyof H>
	actions?: { [K in string]: (obj: T) => Promise<any> }
} & PaginationProps<W>

export const PaginatedActionsCheckListTable = <W extends WrappedCRUD<any, any>>({
	module,
	actions,
	name,
	display = [],
	headers = {} as any,
	...props
}: Props<W>) => {
	const [action, setAction] = useState<string | null>(null)
	const displayProps = useArray<string>(display as string[])
	const [values, setValues] = useState<Record<string, any>>({})
	const loading = useArray<string>([])

	const onAction = useCallback(() => {
		const fn = actions?.[action ?? '']
		console.log({ actions, action, fn })
		if (fn) {
			loading.set(Object.keys(values))
			Object.entries(values).forEach(([id, obj]) => {
				fn(obj).then(() => loading.remove(id))
			})
		}
	}, [values, actions, action])

	const onChange = useCallback((index: Record<string, any>) => {
		setValues(index)
	}, [])

	return (
		<PaginationProvider module={module} {...props}>
			<VStack w='100%'>
				<HStack w='100%'>
					<PaginationNav />
					{actions ? (
						<InputGroup>
							<Select onChange={e => setAction(e.target.value)} placeholder='Actions' value={action?.toString()}>
								{Object.entries(actions).map(([name]) => (
									<option value={name}>{name}</option>
								))}
							</Select>
							<InputRightElement>
								<IconButton onClick={onAction} aria-label='Run Actions' icon={(<ArrowForwardIcon />) as any} />
							</InputRightElement>
						</InputGroup>
					) : null}
					<PaginationSearch />
				</HStack>
				<Wrap>
					<CheckboxGroup onChange={displayProps.set} defaultValue={displayProps.array}>
						{Object.keys(headers).map(p => (
							<Center>
								<Checkbox value={p} />
								{(headers as { [K in string]: string })[p]}
							</Center>
						))}
					</CheckboxGroup>
				</Wrap>
				<PaginatedCheckListTable
					name={name}
					headers={displayProps.array.map(k => (headers as { [K in string]: string })[k]).concat('')}
					onChangeIndex={onChange}
				>
					<CheckListTableRows>
						{(obj: any, id: string) => (
							<Fragment>
								{displayProps.array.map(k => (
									<Td>{obj[k]}</Td>
								))}
								<Td>{loading.array.includes(id) ? <Spinner /> : null}</Td>
							</Fragment>
						)}
					</CheckListTableRows>
				</PaginatedCheckListTable>
			</VStack>
		</PaginationProvider>
	)
}

export const ModuleCheckListTableWithControllers = <W extends WrappedCRUD<any, any>>({ name, ...props }: Props<W>) => {
	return (
		<VStack>
			<Heading>{name}</Heading>
			<PaginatedActionsCheckListTable name={name} {...props} />
		</VStack>
	)
}
export const AdvancedListTable = () => {
	const Order = useOrder()
	return (
		<ModuleCheckListTableWithControllers
			name='Orders'
			headers={{
				id: '#ID',
				status: 'Status'
			}}
			actions={{
				Completed: (obj: any) => Order.crud.update(obj.id, { status: 'completed' }),
				Processing: (obj: any) => Order.crud.update(obj.id, { status: 'processing' })
			}}
			display={['id', 'status']}
			module={Order}
		/>
	)
}
