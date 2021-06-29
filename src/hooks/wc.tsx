import { FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type WCProps = {
	access : wc.Access
}

export const useWCAccess = ({ key, secret, url }: WCProps) => {
	console.log('[WC ACCESS]', { key, secret, url })
	const client = useMemo(() => {
		if (key && secret && url) {
			return wc.wcClient({
				key,
				secret,
				url
			})
		}
	}, [key, secret, url]) as wc.WCClient
	return {
		client
	}
}

export type WCContext = ReturnType<typeof useWCAccess>

export const [WCContextProvider, useWCContext] = createContext<WCContext>({
	name: 'WC Context',
	errorMessage: 'WCProvider missing'
})

export const WCProvider: FunctionalComponent<WCProps> = ({ children, access }) => {
	const ctx = useWCAccess(access)
	if (!ctx.client) {
		return null
	}
	return <WCContextProvider value={ctx}>{children}</WCContextProvider>
}
export const useWC = useWCContext
