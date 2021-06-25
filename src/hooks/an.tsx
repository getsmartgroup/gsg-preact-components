import { FunctionalComponent, h } from 'preact'
import { an } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type ANProps = an.Options

export const useANAccess = (options: an.Options) => {
	const client = useMemo(() => an.gsgANetClient(options), [options])
	return {
		client
	}
}

export type ANContext = ReturnType<typeof useANAccess>

export const [ANContextProvider, useANContext] = createContext<ANContext>({
	name: 'AN Context',
	errorMessage: 'ANProvider missing'
})

export const ANProvider: FunctionalComponent<ANProps> = ({ children, ...options }) => {
	const ctx = useANAccess(options)
	return <ANContextProvider value={ctx}>{children}</ANContextProvider>
}
export const useANet = useANContext
