import { Fragment, FunctionalComponent, h } from 'preact'
import { Box, HStack, Heading, Stack, ChakraProvider, AlertIcon } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import EvosusDashboard from '../EvosusDashboard'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { Props as OptionsProps, useOptionsContext, OptionsProvider } from '../../hooks/options'
import { an, wc, rb, gsc, usePromiseCall } from '../../hooks'
import RBDashboard from '../RBDashboard'
import ErrorAlert from '../ErrorAlert'

export type Props = OptionsProps

const Integrations = () => {
	const { client } = gsc.useGSC()
	const { optionInput, fetching, saving, options } = useOptionsContext()
	const { resolved, loading, rejected } = usePromiseCall(client.getServices)
	if (rejected) {
		return <ErrorAlert>Failed to authenticate client, verify credentials under Config</ErrorAlert>
	}
	if (!resolved) {
		return <Spinner />
	}
	return (
		<Fragment>
			<Tabs variant='soft-rounded' colorScheme='blue'>
				<TabList>
					{resolved.includes('Evosus') ? <Tab>Evosus</Tab> : null}
					{resolved.includes('RB') ? <Tab>RB</Tab> : null}
				</TabList>
				<TabPanels>
					{resolved.includes('Evosus') ? (
						<TabPanel>
							<EvosusDashboard
								clientID={options.gsc.options.access.clientID}
								gsgToken={options.gsc.options.access.gsgToken}
								companySN={options.evosus.access.companySN}
								ticket={options.evosus.access.ticket}
							/>
						</TabPanel>
					) : null}
					{resolved.includes('RB') ? (
						<TabPanel>
							<wc.Provider {...options.wc.options}>
								<rb.Provider {...options.rb.options}>
									<an.Provider {...options.an.options}>
										<RBDashboard />
									</an.Provider>
								</rb.Provider>
							</wc.Provider>
						</TabPanel>
					) : null}
				</TabPanels>
			</Tabs>
		</Fragment>
	)
}

const Main = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()

	return (
		<ChakraProvider>
			<gsc.Provider {...options.gsc.options}>
				<Box>
					<HStack as='header' justifyContent='center' alignItems='center'>
						<Heading>Get Smart Plugin</Heading>
						{fetching || saving ? <Spinner /> : null}
					</HStack>
					<SimpleAccordion>
						<SimplePanel title='Integrations'>{fetching ? <Spinner /> : <Integrations />}</SimplePanel>
						<SimplePanel title='Config'>
							<Stack spacing={3}>
								{optionInput(options.gsc.options.access, 'clientID', 'Client ID')}
								{optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token')}
							</Stack>
						</SimplePanel>
					</SimpleAccordion>
				</Box>
			</gsc.Provider>
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
