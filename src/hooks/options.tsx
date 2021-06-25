import { h } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import Cookies from 'js-cookie'
import { Input, useBoolean } from '@chakra-ui/react'
import { wc, rb, an } from 'gsg-integrations'

export type Props = {
	nonce: string
	cookieHash?: string
	cookieValue?: string
	siteurl: string
}

export type Options = {
	clientID: string
	gsgToken: string
	wc: {
		access: wc.WCAccess
	}
	evosus: {
		access: {
			companySN: string
			ticket: string
		}
	}
	rb: {
		access: rb.RBAccess
	}
	an: {
		options: an.Options
	}
}

export const optionsAPI = ({ nonce, siteurl, cookieHash, cookieValue }: Props) => {
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

export const useOptions = ({ nonce, siteurl, cookieHash, cookieValue }: Props) => {
	const api = useMemo(() => optionsAPI({ nonce, siteurl, cookieHash, cookieValue }), [nonce, siteurl, cookieHash, cookieValue])
	const [saving, setSaving] = useBoolean(false)
	const [fetching, setFetching] = useBoolean(true)
	const [options, setOptions] = useState<Options>({
		clientID: '',
		gsgToken: '',
		wc: {
			access: {
				key: '',
				secret: '',
				url: ''
			}
		},
		evosus: {
			access: {
				companySN: '',
				ticket: ''
			}
		},
		rb: {
			access: {
				CompanyID: '',
				APIKey: '',
				name: ''
			}
		},
		an: {
			options: {
				credentials: {
					name: '',
					refId: '',
					transactionKey: ''
				},
				testMode: true
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
			const api = optionsAPI({ nonce, siteurl, cookieHash, cookieValue })
			setSaving.on()
			api.set(options).finally(setSaving.off.bind(null))
		}
	}, [options])

	const optionInput = <T extends { [K in string]: any }>(obj: Partial<T>, target: keyof T, label: string) => {
		const initialValue = obj[target]
		return (
			<Input
				disabled={fetching}
				placeholder={label}
				value={obj[target] ?? ''}
				onChange={e => {
					const value = e.target.value
					;(obj as any)[target as any] = value
				}}
				onBlur={() => {
					if (obj[target] !== initialValue) {
						setOptions({ ...options })
					}
				}}
			/>
		)
	}

	return {
		optionInput,
		fetching,
		saving,
		options
	}
}