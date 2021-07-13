import { Fragment, FunctionalComponent, h } from 'preact'
import {
	Box,
	HStack,
	Heading,
	Stack,
	ChakraProvider,
	AlertIcon,
	Link,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import EvosusDashboard from '../EvosusDashboard'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { Props as OptionsProps, useOptionsContext, OptionsProvider } from '../../hooks/options'
import { an, wc, rb, gsc, evosus, usePromiseCall } from '../../hooks'
import RBDashboard from '../RBDashboard'
import ErrorAlert from '../ErrorAlert'
import Router, { Route } from 'preact-router'
import { Match } from 'preact-router/match'
import { createHashHistory } from 'history'
import { theme } from './theme'

export type Props = OptionsProps

const Evosus = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()

	return (
		<SimpleAccordion>
			<SimplePanel title='Dashboard'>
				<evosus.Provider {...options.evosus.options}>
					<EvosusDashboard
						clientID={options.gsc.options.access.clientID}
						gsgToken={options.gsc.options.access.gsgToken}
						companySN={options.evosus.options.access.companySN}
						ticket={options.evosus.options.access.ticket}
					/>
				</evosus.Provider>
			</SimplePanel>
			<SimplePanel title='Settings'>
				<Stack>
					{optionInput(options.evosus.options.access, 'companySN', 'Company SN')}
					{optionInput(options.evosus.options.access, 'ticket', 'Ticket')}
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

const RB = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()

	return (
		<SimpleAccordion>
			<SimplePanel title='Dashboard'>
				<rb.Provider {...options.rb.options}>
					<an.Provider {...options.an.options}>
						<RBDashboard />
					</an.Provider>
				</rb.Provider>
			</SimplePanel>
			<SimplePanel title='Settings'>
				<Stack>
					{optionInput(options.rb.options.access, 'CompanyID', 'Company ID')}
					{optionInput(options.rb.options.access, 'APIKey', 'API Key')}
					{optionInput(options.rb.options.access, 'name', 'Company Name')}
					{optionInput(options.an.options.credentials, 'name', 'Authorize.net Name')}
					{optionInput(options.an.options.credentials, 'transactionKey', 'Authorize.net Transaction Key')}
					{optionInput(options.an.options.credentials, 'refId', 'Authorize.net Ref ID (Optional)')}
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

const Integrations = () => {
	const { client } = gsc.useGSC()
	const { optionInput, fetching, saving, options } = useOptionsContext()
	const { resolved, loading, rejected } = usePromiseCall(client.getServices)
	if (rejected) {
		return <ErrorAlert>Failed to authenticate client, verify credentials under Settings</ErrorAlert>
	}
	if (!resolved) {
		return <Spinner />
	}
	return (
		<Stack>
			{resolved.includes('Evosus') ? <Link href='/evosus'>Evosus</Link> : null}
			{resolved.includes('RB') ? <Link href='/rb'>RB</Link> : null}
		</Stack>
	)
}

const Home = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()
	return (
		<Box>
			<SimpleAccordion defaultIndex={[0]} allowMultiple={false} allowToggle={true}>
				<SimplePanel title='Integrations'>{fetching ? <Spinner /> : <Integrations />}</SimplePanel>
				<SimplePanel title='Settings'>
					<Stack spacing={3}>
						{optionInput(options.gsc.options.access, 'clientID', 'Client ID')}
						{optionInput(options.gsc.options.access, 'gsgToken', 'GSG Token')}
						{optionInput(options.wc.options.access, 'key', 'WooCommerce API Key')}
						{optionInput(options.wc.options.access, 'secret', 'WooCommerce API Secret')}
						{optionInput(options.wc.options.access, 'url', 'Website URL')}
					</Stack>
				</SimplePanel>
			</SimpleAccordion>
		</Box>
	)
}

const Main = () => {
	const { optionInput, fetching, saving, options } = useOptionsContext()

	return (
		<ChakraProvider theme={theme}>
			<Stack>
				<HStack as='header' justifyContent='center' alignItems='center'>
					<Heading>
						<Link href='/'>Get Smart Plugin</Link>
					</Heading>
					{fetching || saving ? <Spinner /> : null}
				</HStack>
				<Match path='/'>
					{(match: { matches: true; path: '/'; url: '/' }) => {
						console.dir(match)
						return (
							<Breadcrumb>
								<BreadcrumbItem>
									<BreadcrumbLink as={Link} href='/'>
										Home
									</BreadcrumbLink>
								</BreadcrumbItem>
								{match.path.includes('evosus') ? (
									<BreadcrumbItem>
										<BreadcrumbLink as={Link} href='/evosus'>
											Evosus
										</BreadcrumbLink>
									</BreadcrumbItem>
								) : null}
								{match.path.includes('rb') ? (
									<BreadcrumbItem>
										<BreadcrumbLink as={Link} href='/rb'>
											RB
										</BreadcrumbLink>
									</BreadcrumbItem>
								) : null}
							</Breadcrumb>
						)
					}}
				</Match>
			</Stack>
			<gsc.Provider {...options.gsc.options}>
				<wc.Provider {...options.wc.options}>
					<Router history={createHashHistory() as any}>
						<Route path='/' component={Home} />
						<Route path='/evosus' component={Evosus} />
						<Route path='/rb' component={RB} />
					</Router>
				</wc.Provider>
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
