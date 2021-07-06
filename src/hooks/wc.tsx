import { FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type Props = wc.Options

export const useIntegrationHook = (options: Props) => {
	const client = useMemo(() => {
		if (options) {
			return wc.instance(options)
		}
	}, [options]) as wc.Client
	return {
		client
	}
}

export type Context = ReturnType<typeof useIntegrationHook>

export const [ContextProvider, useContext] = createContext<Context>({
	name: 'WC Context',
	errorMessage: 'WCProvider missing'
})

export const Provider: FunctionalComponent<Props> = ({ children, ...props }) => {
	const ctx = useIntegrationHook(props)
	if (!ctx.client) {
		return null
	}
	return <ContextProvider value={ctx}>{children}</ContextProvider>
}
export const useWC = useContext
