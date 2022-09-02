import { FunctionalComponent, h } from 'preact'
import { gsc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type Props = gsc.Options

export const useIntegrationHook = (options: Props) => {
	const client = useMemo(() => {
		if (options) {
			return gsc.instance(options)
		}
	}, [options]) as gsc.Client
	return {
		client
	}
}

export type Context = ReturnType<typeof useIntegrationHook>

export const [ContextProvider, useContext] = createContext<Context>()

export const Provider: FunctionalComponent<Props> = ({ children, ...props }) => {
	const ctx = useIntegrationHook(props)
	if (!ctx.client) {
		return null
	}
	return <ContextProvider value={ctx}>{children}</ContextProvider>
}
export const useGSC = useContext
