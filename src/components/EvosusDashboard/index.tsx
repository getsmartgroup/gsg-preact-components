import { evosus } from 'gsg-integrations'
import { Tr, Td, Link } from '@chakra-ui/react'
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
	VStack
} from '@chakra-ui/react'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { useEvosus } from '../../hooks/evosus'
import { useArray, usePromiseCall } from '../../hooks'
import { useWC } from '../../hooks/wc'
import { SimpleTable } from '../SimpleTable'
import { Product } from 'gsg-integrations/es5/woocommerce'
import { useOptions } from '../../hooks/options'

export type Props = {
	companySN: string
	ticket: string
	gsgToken: string
	clientID: string
}

const EvosusDashboard: FunctionalComponent<Props> = () => {
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
			</SimpleAccordion>
		</Box>
	)
}

export default EvosusDashboard
