import { h, Fragment } from 'preact'

import { wc, evosus } from 'gsg-integrations'
import * as hooks from '../../hooks'

import { Post } from '../../wp'
import {
	PaginatedActionsCheckListTable,
	useWC,
} from '../../wc'
import { useOrder } from '../../wc/order'
import { Tr, Td, Link } from '@chakra-ui/react'
import { useCallback, useState } from 'preact/hooks'
import {
	Stack,
	Box,
	Heading,
	Radio,
	RadioGroup,
	SimpleGrid,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Button,
	VStack
} from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../../components/SimpleAccordion'
import { useEvosus } from '../../hooks/evosus'
import { useArray, usePromiseCall } from '../../hooks'
import { SimpleTable } from '../../components/SimpleTable'
import { Product } from 'gsg-integrations/types/woocommerce'
import { Props as OptionsProps, useOptionsContext, OptionsProvider, useOptions, OptionInput } from '../../hooks/options'

export type Props = {
	companySN: string
	ticket: string
	gsgToken: string
	clientID: string
}

export const Dashboard: FunctionalComponent<Props> = () => {
	const { options } = useOptions()
	const { client: wcC } = useWC()
	const { client: evosusC } = useEvosus()

	const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch)

	const [productLine, setProductLine] = useState<null | string>(null)
	const [syncing, setSyncing] = useState<boolean>(false)
	const syncResults = useArray<{
		status: string
		products: Product.Type[]
	}>([])
	const syncErrors = useArray<Error>([])

	const syncProducts = useCallback(() => {
		if (!productLine) {
			return
		}
		syncResults.set([])
		setSyncing(true)
		evosus
			.searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
			.then(promises => {
				const results: any[] = []
				const errors: any[] = []

				return Promise.allSettled(
					promises.map(promise => {
						return promise
							.then(res => {
								results.push(res)
								syncResults.concat(results)
							})
							.catch(err => {
								errors.push(err)
								syncErrors.concat(errors)
							})
					})
				)
			})
			.finally(setSyncing.bind(null, false))
	}, [productLine, evosus, wcC, evosusC, syncResults])

	return (
		<Box>
			<Heading w='100%' size='lg' textAlign='center'>
				Evosus Dashboard
			</Heading>
			<SimpleAccordion>
				<SimplePanel title='Sync Products'>
					<VStack w='100%' justifyContent='stretch' alignItems='stretch' alignContent='stretch' justifyItems='stretch'>
						<Heading size='sm'>Select a product Line</Heading>
						{syncing ? 'Loading Product Lines' : null}
						<RadioGroup onChange={setProductLine} value={productLine ?? ''}>
							<SimpleGrid columns={2}>
								{productLines?.map(({ ProductLine, ProductLineID }) => (
									<Radio value={ProductLineID?.toString()}>{ProductLine}</Radio>
								))}
							</SimpleGrid>
						</RadioGroup>
						<Box>
							<Button onClick={syncProducts} w='100%' mt={8} disabled={syncing || !productLine}>
								Sync Products
							</Button>
						</Box>
						<Box>{syncing ? 'Syncing...' : null}</Box>
						<Accordion allowMultiple>
							{syncResults.array.map(res => {
								return (
									<AccordionItem bg={res.status === 'created' ? 'green.400' : 'blue.400'}>
										<AccordionButton>
											<Box flex='1' textAlign='left'>
												{res.products.length} {res.status === 'created' ? 'Created' : 'Updated'}
											</Box>
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel pb={4} bg='white'>
											<SimpleTable headers={['ID#', 'Name', 'SKU', 'Quanitity', 'Price']}>
												{res.products.map(product => {
													return (
														<Tr>
															<Td>
																<Link
																	href={`${options.wc.options.access.url}wp-admin/post.php?post=${product.id}&action=edit`}
																	target='_blank'
																>
																	#{product.id}
																</Link>
															</Td>
															<Td>{product.name}</Td>
															<Td>{product.sku}</Td>
															<Td>{product.stock_quantity}</Td>
															<Td>{product.price}</Td>
														</Tr>
													)
												})}
											</SimpleTable>
										</AccordionPanel>
									</AccordionItem>
								)
							})}
						</Accordion>
					</VStack>
				</SimplePanel>
				<SimplePanel title='Manage Orders'><ManageOrders /></SimplePanel>
			</SimpleAccordion>
		</Box>
	)
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
