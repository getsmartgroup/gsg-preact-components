import { FunctionalComponent, h } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import Cookies from 'js-cookie'
import { chakra, Input, useBoolean } from '@chakra-ui/react'
import { wc, rb, an, gsc, evosus } from 'gsg-integrations'
import { merge } from './common'
import { createContext } from '@chakra-ui/react-utils'

export type Props = {
	nonce: string
	cookieHash?: string
	gsgToken?: string
	cookieValue?: string
	siteurl: string
}

export type Options = {
	gsc: {
		options: gsc.Options
	}
	evosus: {
		options: evosus.Options
	}
	wc: {
		options: wc.Options
	}
	rb: {
		options: rb.Options
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
	const api = useMemo(() => optionsAPI({ nonce, siteurl, cookieHash, cookieValue, gsgToken }), [
		nonce,
		siteurl,
		cookieHash,
		cookieValue,
		gsgToken
	])
	const [saving, setSaving] = useBoolean(false)
	const [fetching, setFetching] = useBoolean(true)
	const [options, setOptions] = useState<Options>({
		gsc: {
			options: {
				access: {
					clientID: '',
					gsgToken: ''
				}
			}
		},
		wc: {
			options: {
				access: {
					key: '',
					secret: '',
					url: ''
				}
			}
		},
		evosus: {
			options: {
				access: {
					companySN: '',
					ticket: ''
				}
			}
		},
		rb: {
			options: {
				access: {
					CompanyID: '',
					APIKey: '',
					name: ''
				}
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
				if (res?.gsc?.options?.access?.gsgToken?.length !== undefined) {
					const merged = merge(options, res)
					setOptions({ ...merged })
				}
			})
			.finally(setFetching.off)
	}, [nonce, siteurl, cookieHash, cookieValue, gsgToken])
	useEffect(() => {
		if (!fetching && !saving && options.gsc.options.access.gsgToken?.length > 0) {
			setSaving.on()
			api.set(options).finally(setSaving.off.bind(null))
		}
	}, [options])

	const optionInput = <T extends { [K in string]: any }>(obj: Partial<T>, target: keyof T, label: string) => {
		const initialValue = obj[target]
		return (
			<chakra.label>
				{label}
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
			</chakra.label>
		)
	}

	return {
		optionInput,
		fetching,
		saving,
		options
	}
}

export const [OptionsContextProvider, useOptionsContext] = createContext<ReturnType<typeof useOptions>>()

export const OptionsProvider: FunctionalComponent<Props> = ({ children, ...props }) => {
	const ctx = useOptions(props)
	return <OptionsContextProvider value={ctx}>{children}</OptionsContextProvider>
}
