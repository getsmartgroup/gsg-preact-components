import { FunctionalComponent, h } from 'preact'
import { Box, HStack, Heading, Stack, ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from 'preact/hooks'
import Cookies from 'js-cookie'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Input, useBoolean } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import EvosusDashboard from '../EvosusDashboard'
export type Props = {
	nonce: string
	cookieHash?: string
	cookieValue?: string
	siteurl: string
}

type Options = {
	clientID: string
	gsgToken: string
	wc: {
		access: {
			key: string
			secret: string
		}
	}
	evosus: {
		access: {
			companySN: string
			ticket: string
		}
	}
}

const RestAPI = ({ nonce, siteurl, cookieHash, cookieValue }: Props) => {
	if (cookieHash && cookieValue) {
		Cookies.set(cookieHash, cookieValue)
	}
	const headers = {
		'X-WP-Nonce': nonce,
		'content-type': 'application/json'
	}
	return {
		get: () =>
			fetch(`${siteurl}/wp-json/gsg/v1/options`, {
				headers,
				credentials: 'include'
			}).then(res => res.json() as Promise<Options>),
		set: (options: Options) =>
			fetch(`${siteurl}/wp-json/gsg/v1/options`, {
				headers,
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(options)
			}).then(res => res.json())
	}
}

const WordpressDashboard: FunctionalComponent<Props> = ({ nonce, siteurl, cookieHash, cookieValue }) => {
	const api = RestAPI({ nonce, siteurl, cookieHash, cookieValue })
	const [saving, setSaving] = useBoolean(false)
	const [fetching, setFetching] = useBoolean(true)
	const [options, setOptions] = useState<Options>({
		clientID: '',
		gsgToken: '',
		wc: {
			access: {
				key: '',
				secret: ''
			}
		},
		evosus: {
			access: {
				companySN: '',
				ticket: ''
			}
		}
	})

	useEffect(() => {
		api.get()
			.then(options => (options ? setOptions(options) : null))
			.finally(setFetching.off.bind(null))
	}, [nonce, siteurl, cookieHash, cookieValue])
	useEffect(() => {
		if (!fetching) {
			const api = RestAPI({ nonce, siteurl, cookieHash, cookieValue })
			setSaving.on()
			api.set(options).finally(setSaving.off.bind(null))
		}
	}, [options])

	const optionInput = (obj: any, target: keyof typeof obj, label: string) => {
		const initialValue = obj[target]
		return (
			<Input
				disabled={fetching}
				placeholder={label}
				value={obj[target]}
				onChange={e => {
					const value = e.target.value
					obj[target] = value
				}}
				onBlur={() => {
					if (obj[target] !== initialValue) {
						setOptions({ ...options })
					}
				}}
			/>
		)
	}

	return (
		<ChakraProvider>
			<Box>
				<HStack as='header' justifyContent='center' alignItems='center'>
					<Heading>Get Smart Plugin</Heading>
					{fetching || saving ? <Spinner /> : null}
				</HStack>
				<Tabs variant='soft-rounded' colorScheme='blue'>
					<TabList>
						<Tab>GSG</Tab>
						<Tab>WooCommerce</Tab>
						<Tab>Evosus</Tab>
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
							</Stack>
						</TabPanel>
						<TabPanel>
							<Heading size='sm'>Evosus Config</Heading>
							<Stack spacing={3}>
								{optionInput(options.evosus.access, 'companySN', 'Evosus Company SN')}
								{optionInput(options.evosus.access, 'ticket', 'Evosus Ticket')}
							</Stack>
							<EvosusDashboard
								clientID={options.clientID}
								gsgToken={options.gsgToken}
								companySN={options.evosus.access.companySN}
								ticket={options.evosus.access.ticket}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</ChakraProvider>
	)
}

export default WordpressDashboard
