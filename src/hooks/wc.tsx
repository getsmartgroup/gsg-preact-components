import { FunctionalComponent, h } from 'preact'
import { wc } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type WCProps = wc.WCAccess

export const useWCAccess = (access: WCProps) => {
	const client = useMemo(() => wc.wcClient(access), [access])
	return {
		client
	}
}

export type WCContext = ReturnType<typeof useWCAccess>

export const [WCContextProvider, useWCContext] = createContext<WCContext>({
	name: 'RB Context',
	errorMessage: 'RBProvider missing'
})

export const WCProvider: FunctionalComponent<WCProps> = ({ children, ...access }) => {
	const ctx = useWCAccess(access)
	return <WCContextProvider value={ctx}>{children}</WCContextProvider>
}
export const useWC = useWCContext
