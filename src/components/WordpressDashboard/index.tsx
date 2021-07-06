import { FunctionalComponent, h } from 'preact'
import { Box, HStack, Heading, Stack, ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import EvosusDashboard from '../EvosusDashboard'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { Props as OptionsProps, useOptionsContext, OptionsProvider } from '../../hooks/options'
import { an, wc, rb } from '../../hooks'
import RBDashboard from '../RBDashboard'

export type Props = OptionsProps

const Main = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()

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
									{(options.wc.options.access.url.length ?? 0) > 0 &&
									(options.wc.options.access.key.length ?? 0) > 0 &&
									(options.wc.options.access.secret.length ?? 0) > 0 ? (
										<wc.Provider {...options.wc.options}>
											<rb.Provider {...options.rb.options}>
												<an.Provider {...options.an.options}>
													<RBDashboard />
												</an.Provider>
											</rb.Provider>
										</wc.Provider>
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
										{optionInput(options.wc.options.access, 'key', 'WC REST API Key')}
										{optionInput(options.wc.options.access, 'secret', 'WC REST API Secret')}
										{optionInput(options.wc.options.access, 'url', 'WC Website URL')}
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
										{optionInput(options.rb.options.access, 'CompanyID', 'RB Company ID')}
										{optionInput(options.rb.options.access, 'APIKey', 'RB API Key')}
										{optionInput(options.rb.options.access, 'name', 'RB Name')}
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

const WordpressDashboard: FunctionalComponent<Props> = props => {
	return (
		<OptionsProvider {...props}>
			<Main />
		</OptionsProvider>
	)
}

export default WordpressDashboard
