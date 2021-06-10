import * as evosus from 'evosus-swaggerhub-sdk/es6/axios';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from '@chakra-ui/react';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Box, Heading, Flex, Radio, RadioGroup, SimpleGrid, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, CheckboxGroup, Checkbox, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
const validateProps = ({ ticket, companySN, gsgToken, clientID }) => {
    if (!companySN || !ticket) {
        return Promise.reject('Invalid evosus access credentials');
    }
    if (!gsgToken || !clientID) {
        return Promise.reject('Invalid GSG access credentials');
    }
    return Promise.resolve({ ticket, companySN, gsgToken, clientID });
};
const fetchProductLines = async (inventory, { companySN, ticket }) => {
    const productLines = await inventory.inventoryProductLineSearch(companySN, ticket).then(res => res.data.response);
    if (!productLines) {
        return Promise.reject('Failed to retrieve product line items from Evosus API');
    }
    return Promise.resolve(productLines);
};
const EvosusDashboard = props => {
    const [productLines, setProductLines] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [productLine, setProductLine] = useState(null);
    const [syncFields, setSyncFields] = useState(['price', 'quantity', 'name', 'weight']);
    const [syncing, setSyncing] = useState(false);
    const [syncResults, setSyncResults] = useState(null);
    // Init
    useEffect(() => {
        // Validate Props
        validateProps(props)
            .then(({ ticket, companySN }) => 
        // Fetch Product Lines
        fetchProductLines(new evosus.InventoryApi(), { ticket, companySN })
            .then(setProductLines)
            .then(setErrorMessage.bind(null, null)))
            .catch(setErrorMessage);
    }, [props]);
    const syncProducts = () => {
        setSyncing(true);
        fetch(`https://us-central1-get-smart-functions.cloudfunctions.net/main/evosus/products/sync?client=${props.clientID}`, {
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
        })
            .then(async (res) => {
            if (res.status === 408) {
                setErrorMessage('The request timed out, you may try again to finish syncing');
                throw new Error(await res.text());
            }
            if (res.status !== 200) {
                setErrorMessage(null);
                return res.json();
            }
            return res.json();
        })
            .then(setSyncResults)
            .then(setErrorMessage.bind(null, null))
            .catch(setErrorMessage.bind(null, 'Error while syncing'))
            .finally(setSyncing.bind(null, false));
    };
    return (<Box>
			<Heading w='100%' textAlign='right'>
				GSG Evosus Dashboard
			</Heading>
			<Box>
				{errorMessage ? (<Alert status='error'>
						<AlertIcon />
						<AlertTitle mr={2}>{errorMessage}</AlertTitle>
						<AlertDescription></AlertDescription>
					</Alert>) : null}
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
						<VStack w='100%' justifyContent='stretch' alignItems='stretch' alignContent='stretch' justifyItems='stretch'>
							<Heading size='sm'>Select a product Line</Heading>
							{productLines === null ? 'Loading Product Lines' : null}
							<RadioGroup onChange={setProductLine} value={productLine ?? ''}>
								<SimpleGrid columns={2}>
									{productLines?.map(({ ProductLine, ProductLineID }) => (<Radio value={ProductLineID?.toString()}>{ProductLine}</Radio>))}
								</SimpleGrid>
							</RadioGroup>
							<Heading size='sm'>Select which properties should be synced</Heading>
							<CheckboxGroup onChange={(s) => setSyncFields(s)} value={syncFields}>
								<SimpleGrid>
									<Checkbox value='name'>Product Name</Checkbox>
									<Checkbox value='price'>Price</Checkbox>
									<Checkbox value='quantity'>Quantity</Checkbox>
									<Checkbox value='weight'>Weight</Checkbox>
								</SimpleGrid>
							</CheckboxGroup>
							<Box>
								<Button onClick={syncProducts} w='100%' mt={8} disabled={syncing || !productLine || syncFields.length === 0}>
									Sync Products
								</Button>
							</Box>
							<Box>{syncing ? 'Syncing...' : null}</Box>

							<Accordion allowMultiple>
								{syncResults?.map(res => {
            return (<AccordionItem bg={res.status === 'fulfilled' ? 'green.400' : 'red.400'}>
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
                        return (<Tr>
																			<Td>{product.id}</Td>
																			<Td>{product.name}</Td>
																			<Td>{product.sku}</Td>
																			<Td>{product.stock_quantity}</Td>
																			<Td>{product.price}</Td>
																		</Tr>);
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
										</AccordionItem>);
        })}
							</Accordion>
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>);
};
export default EvosusDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanN4Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRXZvc3VzRGFzaGJvYXJkL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLGlDQUFpQyxDQUFBO0FBRXpELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQTtBQUN6RSxPQUFPLEVBQXVCLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQTtBQUNsRCxPQUFPLEVBQ04sR0FBRyxFQUNILE9BQU8sRUFDUCxJQUFJLEVBQ0osS0FBSyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULGFBQWEsRUFDYixlQUFlLEVBQ2YsY0FBYyxFQUNkLGFBQWEsRUFDYixNQUFNLEVBQ04sYUFBYSxFQUNiLFFBQVEsRUFDUixNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLE1BQU0sa0JBQWtCLENBQUE7QUFTekIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBUyxFQUFrQixFQUFFO0lBQzFGLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUE7S0FDMUQ7SUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO0tBQ3ZEO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUs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