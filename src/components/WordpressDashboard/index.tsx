import { FunctionalComponent, h } from 'preact'
import { Box, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'preact/hooks'
import Cookies from 'js-cookie'

export type Props = {
	nonce: string
	cookieHash?: string
	cookieValue?: string
	siteURL: string
}

type Options = {
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

const WordpressDashboard: FunctionalComponent<Props> = ({ nonce, siteURL, cookieHash, cookieValue }) => {
	const [options, setOptions] = useState<null | Options>(null)
	useEffect(() => {
		if (cookieHash && cookieValue) {
			Cookies.set(cookieHash, cookieValue)
		}
		fetch(`${siteURL}/wp-json/gsg/v1/options`, {
			headers: {
				'X-WP-Nonce': nonce,
				'content-type': 'application/json',
				Cookie: `${cookieHash}=${cookieValue}`
			},
			credentials: 'include'
		})
			.then(res => res.json())
			.then(setOptions)
			.catch(console.log)
	}, [nonce, siteURL, cookieHash, cookieValue])
	console.log(options)
	return (
		<Box>
			<Heading>Get Smart Plugin</Heading>
		</Box>
	)
}

export default WordpressDashboard
