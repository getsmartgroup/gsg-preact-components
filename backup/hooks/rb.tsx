import { FunctionalComponent, h } from 'preact'
import { rb } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type Props = rb.Options

export const useIntegrationHook = (options: Props) => {
	const client = useMemo(() => {
		if (options) {
			return rb.instance(options)
		}
	}, [options]) as rb.Client
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
export const useRB = useContext
