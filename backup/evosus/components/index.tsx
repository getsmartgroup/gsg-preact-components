import { h, Fragment, FunctionalComponent } from 'preact'

import { wc, evosus } from 'gsg-integrations'
import * as hooks from '../../hooks'

import { Post } from '../../wp'
import {
	PaginatedActionsCheckListTable,
	useWC,
	Product
} from '../../wc'
import { useOrder } from '../../wc/order'
import { chakra, HStack, Td, useBoolean } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'preact/hooks'
import {
	Stack,
	Box,
	Heading,
	Radio,
	RadioGroup,
	SimpleGrid,
	Button,
	VStack
} from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion'
import { useEvosus } from '../../hooks/evosus'
import { useArray, usePromiseCall } from '../../hooks'
import { Props as OptionsProps, useOptions, OptionInput } from '../../hooks/options'
import { CheckboxIndexItem, useContext as useCheckboxIndexContext } from '../../components/CheckboxIndex'
import { useProduct } from '../../wc/product'

import { chunk } from '../../common'

export type Props = {
	companySN: string
	ticket: string
	gsgToken: string
	clientID: string
}

export const Dashboard: FunctionalComponent<Props> = () => {
	return (
		<Box>
			<Heading w='100%' size='lg' textAlign='center'>
				Evosus Dashboard
			</Heading>
			<SimpleAccordion>
				<SimplePanel title='Sync Products'>
					<SyncProducts/>
				</SimplePanel>
				<SimplePanel title='Manage Orders'><ManageOrders /></SimplePanel>
			</SimpleAccordion>
		</Box>
	)
}

export const SyncProducts = () => {
	const { client: wcC } = useWC()
	const { client: evosusC } = useEvosus()

	const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch)

	const [productLine, setProductLine] = useState<null | string>(null)
	const [searching, setSearching] = useBoolean(false)
	const syncResults = useArray<{
		status: string
		products: wc.Product.Type[]
	}>([])
	const syncErrors = useArray<Error>([])

	const [products, setProducts] = useState<null | {create : Array<Partial<wc.Product.Type>>, update : Array<Partial<wc.Product.Type>>}>()

	const searchProducts = useCallback(() => {
		if (!productLine) {
			return
		}
		syncResults.set([])
		setSearching.on()
		evosus
			.searchProductsToSyncToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
			.then(setProducts)
			.finally(setSearching.off)
	}, [productLine, evosus, wcC, evosusC, syncResults])

	const indexes : Array<Record<string, wc.Product.Type>> = useMemo( () => {
		if ( products ) {
			const x = ([]).concat( ...(Object.values(products) as any) )
			console.log({x})
			return chunk( x , 100 ).map( batch => batch.reduce<any>( (
				acc, p
			) => {
				// @ts-expect-error
				acc[p.sku] = p
				return acc
			}, {} ) )
		}
		return [{}] as any
	}, [products] )
	console.log(indexes)

	return (
		<VStack w='100%' justifyContent='stretch' alignItems='stretch' alignContent='stretch' justifyItems='stretch'>
			<Heading size='sm'>Select a product Line</Heading>
			{searching ? 'Loading Product Lines' : null}
			<RadioGroup onChange={setProductLine} value={productLine ?? ''}>
				<SimpleGrid columns={2}>
					{productLines?.map(({ ProductLine, ProductLineID }) => (
						<Radio value={ProductLineID?.toString()}>{ProductLine}</Radio>
					))}
				</SimpleGrid>
			</RadioGroup>
			<Box>
				<Button onClick={searchProducts} w='100%' mt={8} disabled={searching || !productLine}>
					Search Products
				</Button>
			</Box>
			<Box>{searching ? 'Seaching products...' : null}</Box>
			{products ? (
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
		const product = findBySku(sku) ?? index[sku]
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
						<Box>Sku: {product.sku}</Box>
						<Box>Name: {product.name}</Box>
						<Box>Price: {product.price}</Box>
						<Box>Stock Quantity: {product.stock_quantity}</Box>
						<Box>Weight: {product.weight}</Box>
					</VStack>
				</HStack>
			</chakra.label>
		)
	} ) )}</SimpleGrid>)
}

export const Evosus = () => {
	const { fetching, saving, options } = useOptions()

	return (
		<SimpleAccordion>
			<SimplePanel title='Dashboard'>
				<hooks.evosus.Provider {...options.evosus.options}>
					<Dashboard
						clientID={options.gsc.options.access.clientID}
						gsgToken={options.gsc.options.access.gsgToken}
						companySN={options.evosus.options.access.companySN}
						ticket={options.evosus.options.access.ticket}
					/>
				</hooks.evosus.Provider>
			</SimplePanel>
			<SimplePanel title='Settings'>
				<Stack>
					<OptionInput secret obj={options.evosus.options.access} target='companySN' label='Company SN' />
					<OptionInput secret obj={options.evosus.options.access} target='ticket' label='Ticket' />
					<OptionInput obj={options.evosus} target='defaultDistributionID' label='Default distribution ID' />
					<OptionInput obj={options.evosus} target='defaultPaymentID' label='Default payment ID' />
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

export const ManageOrders = () => {
	const { options } = hooks.useOptions()
	const Evosus = hooks.evosus.useEvosus()
	const WC = useWC()
	const Order = useOrder()
	const postOrder = useCallback(
		(obj: wc.Order.Type) => {
			if (obj.meta_data.find(({ key }) => key === 'evosusId')?.value) {
				return Promise.reject(new Error('Order already posted'))
			}
			return evosus
				.postWCOrder(Evosus.client, WC.client)(obj, {
					DistributionMethodID: options.evosus.defaultDistributionID
				})
				.then(evosusId => {
					Order.crud.put(obj.id, {
						meta_data: [
							{
								key: 'evosusId',
								value: evosusId
							}
						]
					})
				})
		},
		[Evosus, WC, options.evosus.defaultDistributionID]
	)
	const applyPayment = useCallback(
		(obj: wc.Order.Type) => {
			if (obj.meta_data?.find(({ key }) => key === 'evosusPaymentId')?.value) {
				return Promise.reject(new Error('Order payment already applied'))
			}
			return evosus
				.applyPaymentToWCOrder(Evosus.client, WC.client)(obj, {
					paymentMethodId: options.evosus.defaultPaymentID ? parseInt(options.evosus.defaultPaymentID) : undefined
				})
				.then(paymentId => {
					Order.crud.put(obj.id, {
						meta_data: [
							{
								key: 'evosusPaymentId',
								value: paymentId
							}
						]
					})
				})
		},
		[Evosus, WC, options.evosus.defaultPaymentID]
	)
	return (
		<PaginatedActionsCheckListTable
			name='orders'
			headers={{
				id: '#ID',
				status: 'Status',
				customer_id: 'Customer ID',
				meta_data: 'Evosus ID',
				paymentId: 'Payment ID',
				distributionId: 'Distribution ID',
				paymentMethodId: 'Payment Method ID'
			}}
			actions={{
				'Post Orders': postOrder,
				'Apply Payments': applyPayment
			}}
			display={['id', 'status', 'customer_id', 'meta_data', 'paymentId', 'distributionId', 'paymentMethodId']}
			module={Order}
		>
			{({ id, status, customer_id, meta_data }: Partial<wc.Order.Type>) => {
				return (
					<Fragment>
						<Td>
							<Post.Link id={id}>{id}</Post.Link>
						</Td>
						<Td>{status}</Td>
						<Td>{customer_id}</Td>
						<Td>{meta_data?.find(({ key }) => key === 'evosusId')?.value}</Td>
						<Td>{meta_data?.find(({ key }) => key === 'evosusPaymentId')?.value}</Td>
						<Td>{options.evosus.defaultDistributionID}</Td>
						<Td>{options.evosus.defaultPaymentID}</Td>
					</Fragment>
				)
			}}
		</PaginatedActionsCheckListTable>
	)
}
