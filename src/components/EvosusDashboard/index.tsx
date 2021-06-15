import * as evosus from 'evosus-swaggerhub-sdk/es6/axios'
import { Product } from 'wc-rest-ts'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'
import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import {
	Box,
	Heading,
	Flex,
	Radio,
	RadioGroup,
	SimpleGrid,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Button,
	CheckboxGroup,
	Checkbox,
	VStack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription
} from '@chakra-ui/react'

export type Props = {
	companySN: string
	ticket: string
	gsgToken: string
	clientID: string
}

const validateProps = ({ ticket, companySN, gsgToken, clientID }: Props): Promise<Props> => {
	if (!companySN || !ticket) {
		return Promise.reject('Invalid evosus access credentials')
	}
	if (!gsgToken || !clientID) {
		return Promise.reject('Invalid GSG access credentials')
	}
	return Promise.resolve({ ticket, companySN, gsgToken, clientID })
}

const fetchProductLines = async (
	inventory: evosus.InventoryApi,
	{ companySN, ticket }: { companySN: string; ticket: string }
) => {
	const productLines = await inventory.inventoryProductLineSearch(companySN, ticket).then(res => res.data.response)
	if (!productLines) {
		return Promise.reject('Failed to retrieve product line items from Evosus API')
	}
	return Promise.resolve(productLines)
}

type Results = Array<
	| {
			status: 'fulfilled'
			value: {
				update?: Product.Type[]
				create?: Product.Type[]
			}
	  }
	| {
			status: 'rejected'
			value: unknown
	  }
>

const EvosusDashboard: FunctionalComponent<Props> = props => {
	const [productLines, setProductLines] = useState<null | evosus.ProductLine[]>(null)
	const [errorMessage, setErrorMessage] = useState<null | string>(null)
	const [productLine, setProductLine] = useState<null | string>(null)
	const [syncFields, setSyncFields] = useState<string[]>(['price', 'quantity', 'name', 'weight'])
	const [syncing, setSyncing] = useState<boolean>(false)
	const [syncResults, setSyncResults] = useState<Results | null>(null)

	// Init
	useEffect(() => {
		// Validate Props
		validateProps(props)
			.then(({ ticket, companySN }) =>
				// Fetch Product Lines
				fetchProductLines(new evosus.InventoryApi(), { ticket, companySN })
					.then(setProductLines)
					.then(setErrorMessage.bind(null, null))
			)
			.catch(setErrorMessage)
	}, [props])

	const syncProducts = () => {
		setSyncing(true)
		fetch(
			`https://us-west4-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${props.clientID}`,
			{
				method: 'POST',
				body: JSON.stringify({
					search: {
						productLineID: productLine
					},
					fields: syncFields
				}),
				headers: {
					authorization: `Bearer ${props.gsgToken}`,
					'content-type': 'application/json'
				}
			}
		)
			.then(async res => {
				if (res.status === 408) {
					setErrorMessage('The request timed out, you may try again to finish syncing')
					throw new Error(await res.text())
				}
				if (res.status !== 200) {
					setErrorMessage(null)
					return res.json()
				}
				return res.json()
			})
			.then(setSyncResults)
			.then(setErrorMessage.bind(null, null))
			.catch(setErrorMessage.bind(null, 'Error while syncing'))
			.finally(setSyncing.bind(null, false))
	}

	return (
		<Box>
			<Heading w='100%' textAlign='right'>
				GSG Evosus Dashboard
			</Heading>
			<Box>
				{errorMessage ? (
					<Alert status='error'>
						<AlertIcon />
						<AlertTitle mr={2}>{errorMessage}</AlertTitle>
						<AlertDescription></AlertDescription>
					</Alert>
				) : null}
			</Box>
			<Accordion allowMultiple>
				<AccordionItem>
					<AccordionButton w='100%'>
						<Flex w='100%' alignItems='center' justifyContent='space-between'>
							<Heading size='md'>Sync Products</Heading>
							<AccordionIcon />
						</Flex>
					</AccordionButton>
					<AccordionPanel pb={4}>
						<VStack
							w='100%'
							justifyContent='stretch'
							alignItems='stretch'
							alignContent='stretch'
							justifyItems='stretch'
						>
							<Heading size='sm'>Select a product Line</Heading>
							{productLines === null ? 'Loading Product Lines' : null}
							<RadioGroup onChange={setProductLine} value={productLine ?? ''}>
								<SimpleGrid columns={2}>
									{productLines?.map(({ ProductLine, ProductLineID }) => (
										<Radio value={ProductLineID?.toString()}>{ProductLine}</Radio>
									))}
								</SimpleGrid>
							</RadioGroup>
							<Heading size='sm'>Select which properties should be synced</Heading>
							<CheckboxGroup onChange={(s: string[]) => setSyncFields(s)} value={syncFields}>
								<SimpleGrid>
									<Checkbox value='name'>Product Name</Checkbox>
									<Checkbox value='price'>Price</Checkbox>
									<Checkbox value='quantity'>Quantity</Checkbox>
									<Checkbox value='weight'>Weight</Checkbox>
								</SimpleGrid>
							</CheckboxGroup>
							<Box>
								<Button
									onClick={syncProducts}
									w='100%'
									mt={8}
									disabled={syncing || !productLine || syncFields.length === 0}
								>
									Sync Products
								</Button>
							</Box>
							<Box>{syncing ? 'Syncing...' : null}</Box>

							<Accordion allowMultiple>
								{syncResults?.map(res => {
									return (
										<AccordionItem bg={res.status === 'fulfilled' ? 'green.400' : 'red.400'}>
											<AccordionButton>
												<Box flex='1' textAlign='left'>
													{res.status === 'fulfilled' ? 'Success' : 'Failure'}
													{': '}
													{res.status === 'fulfilled'
														? res.value.update?.length || res.value.create?.length
														: null}{' '}
													{res.status === 'fulfilled'
														? res.value.update
															? 'Updated'
															: res.value.create
															? 'Created'
															: null
														: null}
												</Box>
												<AccordionIcon />
											</AccordionButton>
											<AccordionPanel pb={4} bg='white'>
												<Table variant='simple'>
													<Thead>
														<Tr>
															<Th>ID#</Th>
															<Th>Name</Th>
															<Th>SKU</Th>
															<Th>Quanitity</Th>
															<Th>Price</Th>
														</Tr>
													</Thead>
													<Tbody>
														{res.status === 'fulfilled'
															? (res.value.update || res.value.create)?.map(product => {
																	return (
																		<Tr>
																			<Td>{product.id}</Td>
																			<Td>{product.name}</Td>
																			<Td>{product.sku}</Td>
																			<Td>{product.stock_quantity}</Td>
																			<Td>{product.price}</Td>
																		</Tr>
																	)
															  })
															: null}
													</Tbody>
													<Tfoot>
														<Tr>
															<Th>ID#</Th>
															<Th>Name</Th>
															<Th>SKU</Th>
															<Th>Quanitity</Th>
															<Th>Price</Th>
														</Tr>
													</Tfoot>
												</Table>
											</AccordionPanel>
										</AccordionItem>
									)
								})}
							</Accordion>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>
	)
}

export default EvosusDashboard
