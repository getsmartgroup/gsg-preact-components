import { FunctionalComponent, h } from 'preact'
import { rb, wc } from 'gsg-integrations'
import { useArray, usePromiseCall, useRB, useWC } from '../../hooks'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { Button, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox } from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { SimpleTable } from '../SimpleTable'
import RadioOptions from '../RadioOptions'
import { useANet } from '../../hooks'

const RBDashboard: FunctionalComponent = () => {
	const { client: wcC } = useWC()
	const { client: rbC } = useRB()
	const { client: anC } = useANet()
	const depts = usePromiseCall(useCallback(rbC.getDepartments, [rbC]), [rbC])
	const [dept, setDept] = useState<string | null>(null)
	const cats = usePromiseCall(
		useCallback(dept ? rbC.getCategories.bind(null, dept) : () => Promise.reject('No dept selected'), [dept]),
		[dept]
	)
	const [cat, setCat] = useState<string | null>(null)
	const created = useArray<wc.Product.Type>([])
	const updated = useArray<wc.Product.Type>([])
	const [syncing, setSyncing] = useBoolean(false)
	const syncProducts = useCallback(() => {
		if (!dept || !cat) {
			return
		}
		setSyncing.on()
		rbC.getProducts(dept, cat)
			.then(rb.syncProductsWithWooCommerce(wcC))
			.then(promises => {
				return promises.map(promise => {
					return promise.then(res => {
						if (res.create) created.concat(res.create)
						if (res.update) updated.concat(res.update)
					})
				})
			})
			.finally(setSyncing.off)
	}, [dept, cat])
	const orders = useArray<wc.Order.Type>([])
	useEffect(() => {
		wcC.Order.crud
			.list({ status: 'processing' })
			.then(orders =>
				orders.filter(order =>
					['authorize_net_cim_credit_card', 'yith_wcauthnet_credit_card_gateway'].includes(order.payment_method)
				)
			)
			.then(orders.set)
	}, [wcC])
	console.log({ dept, cat, syncing })
	const orderIds = useArray<string>([])
	const results = useArray<string[]>([])
	const [posting, setPosting] = useBoolean(false)
	const postOrders = useCallback(() => {
		if (orders && orderIds.array.length > 0) {
			setPosting.on()
			rb.postWCOrders(
				rbC,
				wcC,
				anC
			)(orders.array.filter(o => orderIds.array.includes(o.id.toString())))
				.then(postedOrders =>
					orders.set([...orders.array.filter(o => postedOrders.find(po => po.id === o.id) === null), ...postedOrders])
				)
				.finally(setPosting.off)
		}
	}, [orderIds, rbC])
	return (
		<VStack>
			<Heading size='md'>RB Integration Dashboard</Heading>
			<SimpleAccordion>
				<SimplePanel title='Sync Products'>
					<VStack w='100%' alignItems='stretch'>
						{depts.resolved ? <RadioOptions onChange={setDept} options={depts.resolved} /> : 'Loading Deparments'}
						{cats.resolved ? <RadioOptions onChange={setCat} options={cats.resolved} /> : 'Loading Categories'}
						<Button onClick={syncProducts} disabled={!dept || !cat || syncing}>
							Sync Products
						</Button>
						{created.array.length > 0 || updated.array.length > 0 ? (
							<SimpleTable headers={['ID#', 'Name', 'SKU', 'Regular Price & Sales Price', 'Storage Quantity']}>
								<Thead>Created {created.array.length}</Thead>
								{created.array.map(p => (
									<Tr>
										<Td>{p.id}</Td>
										<Td>{p.name}</Td>
										<Td>{p.sku}</Td>
										<Td>
											{p.regular_price}
											<br />
											{p.sale_price}
										</Td>
										<Td>{p.stock_quantity}</Td>
									</Tr>
								))}
								<Thead>Updated {updated.array.length}</Thead>
								{updated.array.map(p => (
									<Tr>
										<Td>{p.id}</Td>
										<Td>{p.name}</Td>
										<Td>{p.sku}</Td>
										<Td>
											{p.regular_price}
											<br />
											{p.sale_price}
										</Td>
										<Td>{p.stock_quantity}</Td>
									</Tr>
								))}
							</SimpleTable>
						) : null}
					</VStack>
				</SimplePanel>
				<SimplePanel title='Post Orders'>
					<VStack alignItems='stretch'>
						{orders.array ? (
							<SimpleTable headers={['', 'ID#', 'Status', 'CustomerID#']}>
								{orders.array.map(o => (
									<Tr>
										<Td>
											<Checkbox
												name='order-ids'
												onChange={e => {
													if (e.target.checked) {
														orderIds.push(e.target.value)
													} else {
														orderIds.remove(e.target.value)
													}
												}}
												value={o.id.toString()}
												checked={orderIds.array.includes(o.id.toString())}
											/>
										</Td>
										<Td>{o.id}</Td>
										<Td>{o.status}</Td>
										<Td>{o.customer_id}</Td>
									</Tr>
								))}
							</SimpleTable>
						) : (
							'Loading Orders'
						)}
						<Button onClick={postOrders} disabled={posting}>
							Post Orders
						</Button>
					</VStack>
				</SimplePanel>
			</SimpleAccordion>
		</VStack>
	)
}
export default RBDashboard
