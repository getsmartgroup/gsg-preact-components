import { Fragment, FunctionalComponent, h } from 'preact'
import { Heading, Td, Tr, VStack } from '@chakra-ui/react'
import { useWC, useRestClient } from '../context'
import { PaginationProvider, PaginationNav, PaginationContent, PaginationSearch, usePaginationContext } from '../pagination'
import { Order } from 'gsg-integrations/types/woocommerce'
import { Post } from '../../wp'
import { CheckListTable, CheckListTableRows } from '../../components/CheckList'
import { useMemo } from 'preact/hooks'

export const useOrder = () => {
	const crud = useWC().client.Order.crud
	return useRestClient(crud)
}

export const PaginatedCheckListTable: FunctionalComponent = () => {
	const { getCurrentPage, crud } = usePaginationContext()
	const index = useMemo(
		() =>
			getCurrentPage()?.reduce<Record<string, any>>((acc, id) => {
				if (crud.store[id]) {
					acc[id] = crud.store[id]
				}
				return acc
			}, {}),
		[crud, getCurrentPage]
	)
	return (
		<CheckListTable name='orders' index={index ?? {}} headers={['', 'ID#', 'Status', 'CustomerID#']}>
			<CheckListTableRows>
				{(obj: Order.Type) => (
					<Fragment>
						<Td>
							<Post.Link id={obj.id}>{obj.id}</Post.Link>
						</Td>
						<Td>{obj.status}</Td>
						<Td>{obj.customer_id}</Td>
					</Fragment>
				)}
			</CheckListTableRows>
		</CheckListTable>
	)
}

export const AdvancedListTable = () => {
	const Order = useOrder()
	return (
		<PaginationProvider crud={Order}>
			<VStack>
				<Heading>Orders</Heading>
				<PaginationSearch />
				<PaginatedCheckListTable />
				<PaginationNav />
			</VStack>
		</PaginationProvider>
	)
}
