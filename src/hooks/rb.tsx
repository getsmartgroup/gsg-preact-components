import { FunctionalComponent, h } from 'preact'
import { rb } from 'gsg-integrations'
import { createContext } from '@chakra-ui/react-utils'
import { useMemo } from 'preact/hooks'

export type RBProps = rb.RBAccess

export const useRBAccess = (access: RBProps) => {
	const client = useMemo(() => rb.rbClient(access), [access])
	return {
		client
	}
}

export type RBContext = ReturnType<typeof useRBAccess>

export const [RBContextProvider, useRBContext] = createContext<RBContext>({
	name: 'RB Context',
	errorMessage: 'RBProvider missing'
})

export const RBProvider: FunctionalComponent<RBProps> = ({ children, ...access }) => {
	console.log({ access })
	const ctx = useRBAccess(access)
	return <RBContextProvider value={ctx}>{children}</RBContextProvider>
}
export const useRB = useRBContext
