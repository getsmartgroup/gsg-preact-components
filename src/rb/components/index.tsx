import { FunctionalComponent, h, Fragment } from 'preact'
import { rb, wc } from 'gsg-integrations'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { Button, Stack, Heading, Tr, Td, useBoolean, VStack, Thead, Checkbox, Box, chakra, HStack, SimpleGrid } from '@chakra-ui/react'
import * as hooks from '../../hooks'
import { useArray, usePromiseCall } from '../../hooks'
import { useOptionsContext, OptionInput } from '../../hooks/options'
import { Post } from '../../wp'
import { CheckboxIndexItem, useContext as useCheckboxIndexContext } from '../../components/CheckboxIndex'
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion'
import RadioOptions from '../../components/RadioOptions'
import { useWC, PaginatedActionsCheckListTable, Product } from '../../wc'
import { useOrder } from '../../wc/order'
import { useRB } from '../../hooks/rb'
import { useAN } from '../../hooks/an'
import { useProduct } from 'src/wc/product'
import { chunk } from '@common'

export const Dashboard: FunctionalComponent = () => {

	return (
		<VStack>
			<Heading size='lg'>RB Integration Dashboard</Heading>
			<SimpleAccordion>
				<SimplePanel title='Sync Products'>
					<SyncProducts/>
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
					<OptionInput checkbox obj={options.an.options} target='testMode' label='Authorize.net test mode' />
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

export const ManageOrders = () => {
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
				meta_data: 'RB ID',
				transaction_id : 'Transaction ID',
				payment_method_title : 'Payment Method',
			}}
			actions={{
				'Post Orders': postOrder,
			}}
			display={['id', 'status', 'meta_data', 'transaction_id', 'payment_method_title']}
			module={Order}
		>
			{({ id, status, meta_data, transaction_id, payment_method_title }: Partial<wc.Order.Type>) => {
				return (
					<Fragment>
						<Td>
							<Post.Link id={id}>{id}</Post.Link>
						</Td>
						<Td>{status}</Td>
						<Td>{meta_data?.find( ({key}) => key === 'rbId' )?.value}</Td>
						<Td>{transaction_id}</Td>
						<Td>{payment_method_title}</Td>
					</Fragment>
				)
			}}
		</PaginatedActionsCheckListTable>
	)
}

export const SyncProducts = () => {
	const { client: wcC } = useWC()
	const { client: rbC } = useRB()
	const depts = usePromiseCall(useCallback(rbC.getDepartments, [rbC]), [rbC])
	const [dept, setDept] = useState<string | null>(null)
	const cats = usePromiseCall(
		useCallback(dept ? rbC.getCategories.bind(null, dept) : () => Promise.reject('No dept selected'), [dept]),
		[dept]
	)
	const [cat, setCat] = useState<string | null>(null)
	const created = useArray<Partial<wc.Product.Type>>([])
	const updated = useArray<Partial<wc.Product.Type>>([])
	const [syncing, setSyncing] = useBoolean(false)
	const syncProducts = useCallback(() => {
		if (!dept || !cat) {
			return
		}
		setSyncing.on()
		rbC.getProducts(dept, cat)
			.then(rb.syncProductsWithWooCommerce(wcC))
			.then((res) => {
				if (res.create) created.concat(res.create)
				if (res.update) updated.concat(res.update)
			})
			.finally(setSyncing.off)
	}, [dept, cat])

	type Index = Record<string, Partial<wc.Product.Type>>

	const indexes = useMemo( () => {
		return chunk([...created.array, ...updated.array], 100).map( arr => (
			arr.reduce<Index>( (acc, p) => {
				// @ts-expect-error
				acc[p.sku] = p
				return acc
			}, {} as Index )
		) )
	}, [created, updated] )

	return (
		<VStack w='100%'>
			<VStack w='100%' alignItems='stretch'>
				{depts.resolved ? <RadioOptions onChange={setDept} options={depts.resolved} /> : 'Loading Deparments'}
				{cats.resolved ? <RadioOptions onChange={setCat} options={cats.resolved} /> : 'Loading Categories'}
				<Button onClick={syncProducts} disabled={!dept || !cat || syncing}>
					Search Products
				</Button>
			</VStack>
			{indexes.length > 0 ? (
				<SimpleAccordion>
					{indexes?.map( index => (
						<Product.PreImport index={index}>
							<PreImportPreview/>
						</Product.PreImport>
					) )}
				</SimpleAccordion>
			) : null}
		</VStack>
	)
}

export const PreImportPreview = () => {
	const { index } = useCheckboxIndexContext()
	const Product = useProduct()
	const findBySku = useCallback(
		( s : string ) => Product.array.find( ({sku}) => sku === s ),
		[Product.array],
	)
	return (<SimpleGrid columns={2} gap={2} >{( Object.keys( index ).map( (sku) => {
		const product = findBySku(sku) ?? (index[sku] as wc.Product.Type)
		const id = product.id
		return (
			<chakra.label p={4} w='100%'bg={id ? 'blue.200' : 'green.200'} justifyContent='flex-start' >
				<HStack>
					<CheckboxIndexItem id={sku} />
					<Heading w='100%' size='sm' >{
						id ? 'Update' : 'Create'
					}</Heading>
				</HStack>
				<HStack>
					<VStack w='100%' alignItems='flex-start' >
						{product.id ?(<Box>ID: {product.id}</Box>) : null}
						<Box>Name: {product.name}</Box>
						<Box>Sku: {product.sku}</Box>
						<Box>Categories: {product.categories?.map( c => c.name ).join(', ')}</Box>
						<Box>Regular price: {product.regular_price}</Box>
						<Box>Sale price: {product.sale_price}</Box>
						<Box>Stock quantity: {product.stock_quantity}</Box>
						<Box>Description: {product.description}</Box>
						<Box>On sale start date: {product.date_on_sale_from ? (new Date(product.date_on_sale_from).toLocaleString()) : null}</Box>
						<Box>On sale end date: {product.date_on_sale_to ? (new Date(product.date_on_sale_to).toLocaleString()) : null}</Box>
					</VStack>
				</HStack>
			</chakra.label>
		)
	} ) )}</SimpleGrid>)
}
