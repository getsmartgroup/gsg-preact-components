import { evosus } from 'gsg-integrations'
import { Product } from 'wc-rest-ts'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react'
import { FunctionalComponent, h } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import {
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
	CheckboxGroup,
	Checkbox,
	VStack
} from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { useEvosus } from '../../hooks/evosus'
import { usePromiseCall } from '../../hooks'
import { useWC } from '../../hooks/wc'

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

type Results = Array<PromiseSettledResult<Product.Type[] | undefined> | PromiseRejectedResult>
type Await<T> = T extends PromiseLike<infer U> ? U : T
const EvosusDashboard: FunctionalComponent<Props> = () => {
	const { client: wcC } = useWC()
	const { client: evosusC } = useEvosus()

	const { resolved: productLines } = usePromiseCall(evosusC.inventoryApi.inventoryProductLineSearch)

	const [productLine, setProductLine] = useState<null | string>(null)
	const [syncFields, setSyncFields] = useState<string[]>(['price', 'quantity', 'name', 'weight'])
	const [syncing, setSyncing] = useState<boolean>(false)
	const [syncResults, setSyncResults] = useState<Await<ReturnType<typeof evosus.searchAndImportToWooCommerce>> | null>(null)

	const syncProducts = useCallback(() => {
		if (!productLine) {
			return
		}
		setSyncing(true)
		evosus
			.searchAndImportToWooCommerce(wcC, evosusC, { ProductLineID: productLine })
			.then(res => setSyncResults(res))
			.finally(setSyncing.bind(null, false))
	}, [productLine, evosus, wcC, evosusC])

	return (
		<Box>
			<Heading w='100%' size='md'>
				GSG Evosus Dashboard
			</Heading>
			<Box>
				{/* {errorMessage ? (
					<Alert status='error'>
						<AlertIcon />
						<AlertTitle mr={2}>{errorMessage}</AlertTitle>
						<AlertDescription></AlertDescription>
					</Alert>
				) : null} */}
			</Box>
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
				</SimplePanel>
			</SimpleAccordion>
		</Box>
	)
}

export default EvosusDashboard
