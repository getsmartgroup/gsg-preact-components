import { Fragment, FunctionalComponent, h } from 'preact'
import { Box, HStack, Heading, Stack, ChakraProvider, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import Router, { Route } from 'preact-router'
import { Match } from 'preact-router/match'
import { createHashHistory } from 'history'

import EvosusDashboard from '../EvosusDashboard'
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion'
import { Props as OptionsProps, useOptionsContext, OptionsProvider, useOptions, OptionInput } from '../../hooks/options'
import { an, wc, rb, gsc, evosus, usePromiseCall } from '../../hooks'
import RBDashboard from '../RBDashboard'
import ErrorAlert from '../ErrorAlert'
import { theme } from './theme'

export type Props = OptionsProps

const Evosus = () => {
	const { fetching, saving, options } = useOptionsContext()

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
					<OptionInput secret obj={options.evosus.options.access} target='companySN' label='Company SN' />
					<OptionInput secret obj={options.evosus.options.access} target='ticket' label='Ticket' />
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

const RB = () => {
	const { fetching, saving, options } = useOptionsContext()

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
					<OptionInput obj={options.rb.options.access} target='CompanyID' label='Company ID' />
					<OptionInput secret obj={options.rb.options.access} target='APIKey' label='API Key' />
					<OptionInput obj={options.rb.options.access} target='name' label='Company Name' />
					<OptionInput secret obj={options.an.options.credentials} target='name' label='Authorize.net Name' />
					<OptionInput
						secret
						obj={options.an.options.credentials}
						target='transactionKey'
						label='Authorize.net Transaction Key'
					/>
					<OptionInput obj={options.an.options.credentials} target='refId' label='Authorize.net Ref ID (Optional)' />
				</Stack>
			</SimplePanel>
		</SimpleAccordion>
	)
}

const Integrations = () => {
	const { client } = gsc.useGSC()
	const { resolved, rejected } = usePromiseCall(client.getServices)
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
	const { fetching, saving, options } = useOptions()
	return (
		<Box>
			<SimpleAccordion defaultIndex={[0]} allowMultiple={false} allowToggle={true}>
				<SimplePanel title='Integrations'>{fetching ? <Spinner /> : <Integrations />}</SimplePanel>
				<SimplePanel title='Settings'>
					<Stack spacing={3}>
						<OptionInput obj={options.gsc.options.access} target='clientID' label='Client ID' />
						<OptionInput secret obj={options.gsc.options.access} target='gsgToken' label='GSG Token' />
						<OptionInput secret obj={options.wc.options.access} target='key' label='WooCommerce API Key' />
						<OptionInput secret obj={options.wc.options.access} target='secret' label='WooCommerce API Secret' />
						<OptionInput secret obj={options.wc.options.access} target='url' label='Website URL' />
					</Stack>
				</SimplePanel>
			</SimpleAccordion>
		</Box>
	)
}

const Main = () => {
	const { fetching, saving, options } = useOptions()

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
