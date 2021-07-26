import { FunctionalComponent, h, Fragment } from 'preact'
import { rb, wc } from 'gsg-integrations'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { Button, Stack, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox } from '@chakra-ui/react'
import * as hooks from '../../hooks'
import { useArray, usePromiseCall } from '../../hooks'
import { useOptionsContext, OptionInput } from '../../hooks/options'
import { Post } from '../../wp'
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion'
import { SimpleTable } from '../../components/SimpleTable'
import RadioOptions from '../../components/RadioOptions'
import { useWC, PaginatedActionsCheckListTable } from '../../wc'
import { useOrder } from '../../wc/order'
import { useRB } from '../../hooks/rb'
import { useAN } from '../../hooks/an'

export const Dashboard: FunctionalComponent = () => {
	const { client: wcC } = useWC()
	const { client: rbC } = useRB()
	const { client: anC } = useAN()
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

	return (
		<VStack>
			<Heading size='lg'>RB Integration Dashboard</Heading>
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
					<ManageOrders/>
				</SimplePanel>
			</SimpleAccordion>
		</VStack>
	)
}
export const RB = () => {
	const { options } = useOptionsContext()

	return (
		<SimpleAccordion>
			<SimplePanel title='Dashboard'>
				<hooks.rb.Provider {...options.rb.options}>
					<hooks.an.Provider {...options.an.options}>
						<Dashboard />
					</hooks.an.Provider>
				</hooks.rb.Provider>
			</SimplePanel>
			<SimplePanel title='Settings'>
				<Stack>
					<OptionInput obj={options.rb.options.access} target='CompanyID' label='Company ID' />
					<OptionInput secret obj={options.rb.options.access} target='APIKey' label='API Key' />
					<OptionInput obj={options.rb.options.access} target='name' label='Company Name' />
					<OptionInput secret obj={options.an.options.credentials} target='name' label='Authorize.net Name' />
					<OptionInput
						secret
						obj={options.an.options.credentials}
						target='transactionKey'
						label='Authorize.net Transaction Key'
					/>
					<OptionInput obj={options.an.options.credentials} target='refId' label='Authorize.net Ref ID (Optional)' />
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

export const ManageOrders = () => {
	const { options } = hooks.useOptions()
	const Order = useOrder()
	const WC = useWC()
	const RB = useRB()
	const AN = useAN()
	const postOrder = useCallback(
		(obj: wc.Order.Type) => {
			if ( obj.meta_data?.find( ( {key} ) => key === 'rbId')?.value ) {
				return Promise.reject(new Error('Order already posted'))
			}
			return rb.postWCOrder( RB.client, WC.client, AN.client )( obj ).then( rbId => {
				return Order.crud.put( obj.id, {
					meta_data : [{
						key: 'rbId',
						value: rbId
					}]
				} )
			} )
		},
		[RB, Order]
	)
	return (
		<PaginatedActionsCheckListTable
			name='orders'
			headers={{
				id: '#ID',
				status: 'Status',
				meta_data: 'RB ID'
			}}
			actions={{
				'Post Orders': postOrder,
			}}
			display={['id', 'status', 'meta_data']}
			module={Order}
		>
			{({ id, status, meta_data }: Partial<wc.Order.Type>) => {
				return (
					<Fragment>
						<Td>
							<Post.Link id={id}>{id}</Post.Link>
						</Td>
						<Td>{status}</Td>
						<Td>{meta_data?.find( ({key}) => key === 'rbId' )?.value}</Td>
					</Fragment>
				)
			}}
		</PaginatedActionsCheckListTable>
	)
}
