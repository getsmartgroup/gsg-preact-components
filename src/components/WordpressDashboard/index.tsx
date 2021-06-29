import { Fragment, FunctionalComponent, h } from 'preact'
import { Box, HStack, Heading, Stack, ChakraProvider, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import EvosusDashboard from '../EvosusDashboard'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { Props as OptionsProps, useOptions } from '../../hooks/options'
import { WCProvider, RBProvider, ANProvider } from '../../hooks'
import RBDashboard from '../RBDashboard'

export type Props = OptionsProps

const WordpressDashboard: FunctionalComponent<Props> = props => {
	const { optionInput, fetching, saving, options } = useOptions(props)
	console.log(options)
	// return null

	return (
		<ChakraProvider>
			<Box>
				<HStack as='header' justifyContent='center' alignItems='center'>
					<Heading>Get Smart Plugin</Heading>
					{fetching || saving ? <Spinner /> : null}
				</HStack>
				<SimpleAccordion>
					<SimplePanel title='Integrations'>
						<Tabs variant='soft-rounded' colorScheme='blue'>
							<TabList>
								<Tab>Evosus</Tab>
								<Tab>RB</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<EvosusDashboard
										clientID={options.clientID}
										gsgToken={options.gsgToken}
										companySN={options.evosus.access.companySN}
										ticket={options.evosus.access.ticket}
									/>
								</TabPanel>
								<TabPanel>
									{(options.wc.access.url.length ?? 0) > 0 &&
									(options.wc.access.key.length ?? 0) > 0 &&
									(options.wc.access.secret.length ?? 0) > 0 ? (
										<WCProvider access={options.wc.access}>
											<RBProvider {...options.rb.access}>
												<ANProvider {...options.an.options}>
													<RBDashboard />
												</ANProvider>
											</RBProvider>
										</WCProvider>
									) : null}
								</TabPanel>
							</TabPanels>
						</Tabs>
					</SimplePanel>
					<SimplePanel title='Config'>
						<Tabs variant='soft-rounded' colorScheme='blue'>
							<TabList>
								<Tab>GSG</Tab>
								<Tab>WooCommerce</Tab>
								<Tab>Evosus</Tab>
								<Tab>RB</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Heading size='sm'>GSG Config</Heading>
									<Stack spacing={3}>
										{optionInput(options, 'clientID', 'Client ID')}
										{optionInput(options, 'gsgToken', 'GSG Token')}
									</Stack>
								</TabPanel>
								<TabPanel>
									<Heading size='sm'>WooCommerce Config</Heading>
									<Stack spacing={3}>
										{optionInput(options.wc.access, 'key', 'WC REST API Key')}
										{optionInput(options.wc.access, 'secret', 'WC REST API Secret')}
										{optionInput(options.wc.access, 'url', 'WC Website URL')}
									</Stack>
								</TabPanel>
								<TabPanel>
									<Heading size='sm'>Evosus Config</Heading>
									<Stack spacing={3}>
										{optionInput(options.evosus.access, 'companySN', 'Evosus Company SN')}
										{optionInput(options.evosus.access, 'ticket', 'Evosus Ticket')}
									</Stack>
								</TabPanel>
								<TabPanel>
									<Heading size='sm'>RB Config</Heading>
									<Stack spacing={3}>
										{optionInput(options.rb.access, 'CompanyID', 'RB Company ID')}
										{optionInput(options.rb.access, 'APIKey', 'RB API Key')}
										{optionInput(options.rb.access, 'name', 'RB Name')}
										{optionInput(options.an.options.credentials, 'name', 'Authorize.net credentials name')}
										{optionInput(
											options.an.options.credentials,
											'transactionKey',
											'Authorize.net credentials Transaction Key'
										)}
										{optionInput(
											options.an.options.credentials,
											'refId',
											'Authorize.net credentials Ref ID (Optional)'
										)}
									</Stack>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</SimplePanel>
				</SimpleAccordion>
			</Box>
		</ChakraProvider>
	)
}

export default WordpressDashboard
