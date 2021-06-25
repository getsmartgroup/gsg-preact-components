import { FunctionalComponent, h } from 'preact'
import { rb, wc } from 'gsg-integrations'
import { useArray, usePromiseCall } from '../../hooks'
import { useCallback, useState } from 'preact/hooks'
import { Button, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox } from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { SimpleTable } from '../SimpleTable'
import RadioOptions from '../RadioOptions'

export type Props = {
	rbC: rb.RBClient
	wcC: wc.WCClient
}

const RBDashboard: FunctionalComponent<Props> = ({ rbC, wcC }) => {
	const depts = usePromiseCall(useCallback(rbC.getDepartments, [rbC]), [rbC])
	const [dept, setDept] = useState<string | null>(null)
	const cats = usePromiseCall(
		useCallback(dept ? rbC.getCategories.bind(null, dept) : () => Promise.resolve([]), [dept]),
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
			.then(promises =>
				promises.map(promise =>
					promise.then(res => {
						if (res.create) created.concat(res.create)
						if (res.update) updated.concat(res.update)
					})
				)
			)
			.finally(setSyncing.off)
	}, [dept, cat])
	const orders = usePromiseCall(
		useCallback(() => wcC.Order.crud.list({}), [wcC]),
		[wcC]
	)
	const orderIDs = useArray<string[]>([])
	return (
		<VStack>
			<Heading>RB Integration Dashboard</Heading>
			<SimpleAccordion>
				<SimplePanel title='Sync Products'>
					<VStack>
						{depts.resolved ? (
							<RadioOptions onChange={setDept} options={depts.resolved} />
						) : (
							'Loading Deparments'
						)}
						{cats.resolved ? <RadioOptions cats={setCat} options={cats.resolved} /> : 'Loading Categories'}
						<Button onChange={syncProducts} disabled={!dept || !cat || syncing}>
							Sync Products
						</Button>
						<SimpleTable
							headers={['ID#', 'Name', 'SKU', 'Regular Price & Sales Price', 'Storage Quantity']}
						>
							<Thead>Created</Thead>
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
							<Thead>Updated</Thead>
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
					</VStack>
				</SimplePanel>
				<SimplePanel title='Post Orders'>
					<VStack>
						{orders.resolved ? (
							<SimpleTable headers={['', 'ID#', 'Status', 'CustomerID#']}>
								{orders.resolved.map(o => (
									<Tr>
										<Td>
											<Checkbox
												name='order-ids'
												onChange={e => {
													if (e.target.checked) {
														orderIDs.push(e.target.value)
													} else {
														orderIDs.remove(e.target.value)
													}
												}}
												value={o.id}
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
					</VStack>
				</SimplePanel>
			</SimpleAccordion>
		</VStack>
	)
}
export default RBDashboard
