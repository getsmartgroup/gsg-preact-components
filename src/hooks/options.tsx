import { h } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import Cookies from 'js-cookie'
import { Input, useBoolean } from '@chakra-ui/react'
import { wc, rb, an } from 'gsg-integrations'
import { merge } from './common'

export type Props = {
	nonce: string
	cookieHash?: string
	gsgToken?: string
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

export const optionsAPI = ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }: Props) => {
	if (!gsgToken && cookieHash && cookieValue) {
		Cookies.set(cookieHash, cookieValue)
	}
	const headers: any = {
		'content-type': 'application/json'
	}
	if (gsgToken) {
		headers['Authorization'] = `Bearer ${gsgToken}`
	} else {
		headers['X-WP-Nonce'] = nonce
	}
	return {
		get: () =>
			fetch(`${siteurl}/wp-json/gsg/v1/options`, {
				headers,
				credentials: 'include'
			}).then(res => res.json() as Promise<Options>),
		set: (options: Options) => {
			console.log({ headers })
			return fetch(`${siteurl}/wp-json/gsg/v1/options`, {
				headers,
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(options)
			}).then(res => res.json())
		}
	}
}

export const useOptions = ({ nonce, siteurl, cookieHash, cookieValue, gsgToken }: Props) => {
	console.log({ gsgToken })
	const api = useMemo(() => optionsAPI({ nonce, siteurl, cookieHash, cookieValue, gsgToken }), [
		nonce,
		siteurl,
		cookieHash,
		cookieValue,
		gsgToken
	])
	const [saving, setSaving] = useBoolean(false)
	const [fetching, setFetching] = useBoolean(false)
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
		setFetching.on()
		api.get()
			.then(res => {
				if (res.gsgToken?.length !== undefined) {
					const merged = merge(options, res)
					setOptions({ ...merged })
				}
			})
			.finally(setFetching.off)
	}, [nonce, siteurl, cookieHash, cookieValue, gsgToken])
	useEffect(() => {
		if (!fetching && !saving && options.gsgToken?.length > 0) {
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
				value={obj[target]}
				onChange={e => {
					const value = e.target.value
					;(obj as any)[target] = value
				}}
				onBlur={() => {
					console.log(obj[target], initialValue)
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
